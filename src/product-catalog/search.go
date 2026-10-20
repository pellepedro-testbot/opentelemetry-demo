// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"fmt"
	"strings"

	pb "github.com/opentelemetry/opentelemetry-demo/src/product-catalog/genproto/oteldemo"
)

// maxSearchResults caps how many products one search returns.
const maxSearchResults = 50

// productColumns is the column list every product query selects, in the order
// getProductsFromRows scans them.
const productColumns = `p.id, p.name, p.description, p.picture,
		       p.price_currency_code, p.price_units, p.price_nanos, p.categories`

// searchByNamePrefix finds products whose name starts with the pattern. A
// prefix pattern is cheaper than a substring scan.
const searchByNamePrefix = `
		SELECT ` + productColumns + `
		FROM catalog.products p
		WHERE LOWER(p.name) LIKE $1
		ORDER BY p.id
		LIMIT $2
	`

// searchByText finds products whose name or description contains the pattern.
const searchByText = `
		SELECT ` + productColumns + `
		FROM catalog.products p
		WHERE LOWER(p.name) LIKE $1 OR LOWER(p.description) LIKE $1
		ORDER BY p.id
		LIMIT $2
	`

// normalizeQuery trims the query, lowercases it and collapses runs of
// whitespace into one space, so "  Solar   Filter " and "solar filter" search
// the same way.
func normalizeQuery(query string) string {
	return strings.ToLower(strings.Join(strings.Fields(query), " "))
}

// isSingleWord reports whether a normalized query is one word. A single word
// is what people type into the search box, and a name prefix answers it
// without scanning every description.
func isSingleWord(query string) bool {
	return query != "" && !strings.Contains(query, " ")
}

func searchProductsFromDB(ctx context.Context, query string) ([]*pb.Product, error) {
	if db == nil {
		return nil, fmt.Errorf("database connection not initialized")
	}

	q := normalizeQuery(query)
	if isSingleWord(q) {
		return queryProducts(ctx, searchByNamePrefix, q+"%")
	}
	return queryProducts(ctx, searchByText, "%"+q+"%")
}

func queryProducts(ctx context.Context, sqlText, pattern string) ([]*pb.Product, error) {
	rows, err := db.QueryContext(ctx, sqlText, pattern, maxSearchResults)
	if err != nil {
		return nil, fmt.Errorf("failed to query products: %w", err)
	}
	defer rows.Close()

	products, err := getProductsFromRows(ctx, rows)
	if err != nil {
		return nil, fmt.Errorf("failed to get products from rows: %w", err)
	}

	return products, nil
}

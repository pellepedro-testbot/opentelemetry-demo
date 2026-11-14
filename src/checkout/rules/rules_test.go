// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package rules

import "testing"

var sampledRules = []struct {
	name     string
	rule     func(int, int64) (int64, error)
	maxScore int64
}{
	{"BundleRule01_0", BundleRule01_0, 565000},
	{"BasketRule01_1", BasketRule01_1, 422000},
	{"BasketRule01_2", BasketRule01_2, 852000},
}

func TestRulesRefuseNegativeInput(t *testing.T) {
	for _, r := range sampledRules {
		for _, in := range []struct {
			items int
			units int64
		}{{-1, 0}, {0, -1}} {
			score, err := r.rule(in.items, in.units)
			if err == nil || score != 0 {
				t.Errorf("%s(%d, %d) = %d, %v; want 0 and an error", r.name, in.items, in.units, score, err)
			}
		}
	}
}

func TestRulesScoreZeroItemsAsZero(t *testing.T) {
	for _, r := range sampledRules {
		score, err := r.rule(0, 100)
		if err != nil || score != 0 {
			t.Errorf("%s(0, 100) = %d, %v; want 0, nil", r.name, score, err)
		}
	}
}

func TestRulesCapTheirScore(t *testing.T) {
	for _, r := range sampledRules {
		score, err := r.rule(10000, 1_000_000_000)
		if err != nil || score != r.maxScore {
			t.Errorf("%s(10000, 1e9) = %d, %v; want %d, nil", r.name, score, err, r.maxScore)
		}
	}
}

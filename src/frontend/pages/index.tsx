// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Ad from '../components/Ad';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import * as S from '../styles/Home.styled';
import { useQuery } from '@tanstack/react-query';
import ApiGateway from '../gateways/Api.gateway';
import Banner from '../components/Banner';
import { CypressFields } from '../utils/enums/CypressFields';
import { useCurrency } from '../providers/Currency.provider';
import { Context as AdContext } from '../providers/Ad.provider';

const Home: NextPage = () => {
  const { selectedCurrency } = useCurrency();
  const [category, setCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products', selectedCurrency],
    queryFn: () => ApiGateway.listProducts(selectedCurrency),
  });
  const { data: categoryProducts = [] } = useQuery({
    queryKey: ['products', selectedCurrency, category],
    queryFn: () => ApiGateway.listProducts(selectedCurrency, category),
    enabled: !!category,
  });
  const { data: searchProducts = [] } = useQuery({
    queryKey: ['products', selectedCurrency, 'search', search],
    queryFn: () => ApiGateway.searchProducts(search, selectedCurrency),
    enabled: !!search,
  });
  const productList = search ? searchProducts : category ? categoryProducts : allProducts;
  const categories = [...new Set(allProducts.flatMap(product => product.categories))].sort();
  const { data: adList = [] } = useQuery({
    queryKey: ['ads', ['home']],
    queryFn: () => ApiGateway.listAds(['home']),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      <Head>
        <title>Otel Demo - Home</title>
      </Head>
      <S.Home data-cy={CypressFields.HomePage}>
        <Banner />
        <S.Container>
          <S.Row>
            <S.Content>
              <S.HotProducts>
                <S.HotProductsTitle data-cy={CypressFields.HotProducts} id="hot-products">
                  Hot Products ({productList.length})
                </S.HotProductsTitle>
                <S.SearchForm
                  role="search"
                  onSubmit={event => {
                    event.preventDefault();
                    setCategory('');
                    setSearch(searchInput.trim());
                  }}
                >
                  <S.SearchInput
                    type="search"
                    aria-label="Search products"
                    placeholder="Search products"
                    value={searchInput}
                    onChange={event => setSearchInput(event.target.value)}
                  />
                  <S.CategoryButton type="submit">Search</S.CategoryButton>
                </S.SearchForm>
                <S.CategoryFilters>
                  {['', ...categories].map(name => (
                    <S.CategoryButton
                      key={name || 'all'}
                      type="button"
                      $type={!search && name === category ? 'primary' : 'secondary'}
                      aria-pressed={!search && name === category}
                      onClick={() => {
                        setSearch('');
                        setSearchInput('');
                        setCategory(name);
                      }}
                    >
                      {name || 'All'}
                    </S.CategoryButton>
                  ))}
                </S.CategoryFilters>
                <ProductList productList={productList} />
              </S.HotProducts>
            </S.Content>
          </S.Row>
        </S.Container>
        <AdContext.Provider value={{ adList, recommendedProductList: [] }}>
          <Ad />
        </AdContext.Provider>
      </S.Home>
    </Layout>
  );
};

export default Home;

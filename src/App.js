import { useEffect, useState } from 'react';
import { useHttp } from './components/hooks/useHttp';
import { AddProduct } from './components/UIElements/AddProduct';
import { ProductList } from './components/UIElements/ProductList';
import { GlobalStyle } from './globalStyles';

export const App = () => {
  const { isLoading, hasError: error, sendRequest, data: products } = useHttp();

  const addProduct = (product) => {
    sendRequest(
      'https://frontly-acb60-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: product }),
      }
    );
  };

  const deleteProduct = (id) => {
    sendRequest(
      `https://frontly-acb60-default-rtdb.firebaseio.com/products/${id}.json`,
      { method: 'DELETE' }
    );
  };

  return (
    <>
      <GlobalStyle />
      <AddProduct addProduct={addProduct} />
      {isLoading && !error && products.length === 0 && <p>Loading...</p>}
      {!isLoading && error && products.length === 0 && <p>{error}</p>}
      {!isLoading && !error && products.length === 0 && (
        <p>No products found!</p>
      )}
      {!isLoading && !error && products.length > 0 && (
        <ProductList onDelete={deleteProduct} products={products} />
      )}
    </>
  );
};

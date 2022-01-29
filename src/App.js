import { useEffect, useState } from 'react';
import { useHttp } from './components/hooks/useHttp';
import { NewProduct } from './components/UIElements/NewProduct';
import { ProductList } from './components/UIElements/ProductList';
import { GlobalStyle } from './globalStyles';
import { UpdateProduct } from './components/UIElements/UpdateProduct';

export const App = () => {
  const [products, setProducts] = useState([]);
  const {
    isLoading,
    hasError: error,
    sendRequest: sendHttpRequest,
  } = useHttp();

  useEffect(() => {
    sendHttpRequest(
      {
        url: 'https://frontly-acb60-default-rtdb.firebaseio.com/products.json',
      },
      (data) => {
        const loadedData = [];
        for (const item in data) {
          loadedData.push({
            id: item,
            name: data[item].name,
          });
        }
        setProducts(loadedData);
      }
    );
  }, []);

  const createProduct = (p) => {
    sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/products.json`,
        method: 'POST',
        body: p,
        headers: { 'Content-Type': 'application/json' },
      },
      (data) => {
        const id = data.name;
        const product = { id, name: p.name };
        setProducts((previousProducts) => [...previousProducts, product]);
      }
    );
  };

  const deleteProduct = (id) => {
    sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/products/${id}.json`,
        method: 'DELETE',
      },
      () => {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
      }
    );
  };

  const updateProduct = (id, name) => {
    sendHttpRequest(
      {
        url: `https://frontly-acb60-default-rtdb.firebaseio.com/products/${id}.json`,
        method: 'PUT',
        body: { name: name },
        headers: { 'Content-Type': 'application/json' },
      },
      (data) => {
        const { id } = products.find((product) => product.id === id);
        setProducts((previousProducts) => [
          ...previousProducts,
          { id: id, ...data },
        ]);
      }
    );
  };

  return (
    <>
      <GlobalStyle />
      <NewProduct createProduct={createProduct} />
      <UpdateProduct updateProduct={updateProduct} />
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

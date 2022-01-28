import { useState } from 'react';

export const AddProduct = ({ addProduct }) => {
  const [product, setProduct] = useState('');

  const addProductSubmitHandler = (event) => {
    event.preventDefault();
    if (product.length > 0) {
      addProduct(product);
      setProduct('');
    } else {
      console.log('No product to save.');
    }
  };

  const changeProductInputHandler = (e) => setProduct(e.target.value);

  return (
    <form onSubmit={addProductSubmitHandler}>
      <fieldset>
        <legend>add product</legend>
        <input
          value={product}
          type='text'
          onChange={changeProductInputHandler}
        />
        <button type='submit'>add</button>
      </fieldset>
    </form>
  );
};

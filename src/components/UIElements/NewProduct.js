import { useState } from 'react';

export const NewProduct = ({ createProduct }) => {
  const [product, setProduct] = useState('');

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (product.length > 0) {
      createProduct({ name: product });
      setProduct('');
    } else {
      console.log('Please enter a valid product.');
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <fieldset>
        <legend>add product</legend>
        <input
          placeholder='product-name'
          value={product}
          type='text'
          onChange={(e) => setProduct(e.target.value)}
        />
        <button type='submit' style={{ cursor: 'pointer' }}>
          add
        </button>
      </fieldset>
    </form>
  );
};

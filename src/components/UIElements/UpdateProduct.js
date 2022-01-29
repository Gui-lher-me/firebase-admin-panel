import { useState } from 'react';

export const UpdateProduct = ({ updateProduct }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (id.length > 0 && name.length > 0) {
      updateProduct(id, name);
      setId('');
      setName('');
    } else {
      console.log('Please enter a valid id and a valid name.');
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <fieldset>
        <legend>update product</legend>
        <input
          placeholder='product-id'
          value={id}
          type='text'
          onChange={(e) => setId(e.target.value)}
        />
        <input
          placeholder='new-product-name'
          value={name}
          type='text'
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit' style={{ cursor: 'pointer' }}>
          update
        </button>
      </fieldset>
    </form>
  );
};

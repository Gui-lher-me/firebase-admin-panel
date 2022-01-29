export const ProductItem = ({ product, onDelete }) => {
  return (
    <li style={{ cursor: 'pointer' }} onClick={onDelete.bind(null, product.id)}>
      {product.name}
    </li>
  );
};

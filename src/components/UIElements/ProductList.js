import { ProductItem } from './ProductItem';

export const ProductList = ({ products, onDelete }) => (
  <ul>
    {products.map((product) => (
      <ProductItem onDelete={onDelete} key={product.id} product={product} />
    ))}
  </ul>
);

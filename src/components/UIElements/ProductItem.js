import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: lightgreen;
  margin-top: 10px;
  padding: 4px 12px;

  p {
    flex-grow: 1;
  }

  span {
    cursor: pointer;
  }
`;

export const ProductItem = ({ product, onDelete }) => {
  const deleteItemHandler = () => onDelete(product.id);
  return (
    <ListItem>
      <p>{product.product}</p>
      <span onClick={deleteItemHandler}>X</span>
    </ListItem>
  );
};

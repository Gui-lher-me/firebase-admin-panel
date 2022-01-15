import { Fragment } from 'react';

export const Counter = ({
  counter,
  decrementButtonHandler,
  incrementButtonHandler,
}) => {
  return (
    <Fragment>
      <button onClick={decrementButtonHandler}>-</button>
      {counter}
      <button onClick={incrementButtonHandler}>+</button>
    </Fragment>
  );
};

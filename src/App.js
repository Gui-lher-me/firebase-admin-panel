import { useSelector, useDispatch } from 'react-redux';

import { Counter } from './components';
import { Paginate } from './react-paginate/Paginate';

import { increment, decrement } from './redux/actions';

export const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const incrementButtonHandler = () => dispatch(increment());

  const decrementButtonHandler = () => dispatch(decrement());

  return (
    <Counter
      decrementButtonHandler={decrementButtonHandler}
      incrementButtonHandler={incrementButtonHandler}
      counter={counter}
    />
  );
  // return <Paginate />;
};

import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { createStore } from 'redux';

import { App } from './App';
import { allReducers } from './redux/reducers';

import './index.css';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const element = document.querySelector('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
);

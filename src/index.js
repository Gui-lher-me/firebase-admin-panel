import { render } from 'react-dom';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const element = document.querySelector('#root');

render(<App />, element);

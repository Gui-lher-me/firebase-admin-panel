import { combineReducers } from 'redux';

import { counterReducer } from './counterReducer';
import { toggleReducer } from './toggleReducer';

export const allReducers = combineReducers({ counterReducer, toggleReducer });

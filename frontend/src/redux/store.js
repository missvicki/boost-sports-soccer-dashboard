import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

let middleWares = [];
middleWares = [...middleWares, thunk];

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

const middleware = [...middleWares, thunk, logger]

const store = createStore(reducers, {}, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store;

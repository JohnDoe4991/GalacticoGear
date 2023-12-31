import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './product';
import reviewsReducer from './reviews';
import session from './session'
import cartItemReducer from './cart';
import favesReducer from './favorites';

const rootReducer = combineReducers({
  session,
  products: productReducer,
  reviews: reviewsReducer,
  cartItems: cartItemReducer,
  favorites: favesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

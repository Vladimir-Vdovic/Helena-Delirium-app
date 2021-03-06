// store
export configureStore from './store';

// actions
export {
  addToCart,
  changeProductQuantity,
  clearOrderError,
  clearSavedOrderInfo,
  removeAllFromCart,
  removeFromCart,
  saveOrderInfo,
  setAddedToCart,
  setAllRemovedFromCart,
  setRemovedFromCart,
} from './actions';

// selectors
export {
  getCatalogue,
  getOrder,
  getProductFromCatalogue,
  getSavedOrderInfo,
  getShoppingCart,
} from './selectors';

// middleware actions

export { sendOrder } from './sendOrder';

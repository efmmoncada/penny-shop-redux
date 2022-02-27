import { combineReducers } from "redux";

import {
  ADD_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT,
} from "./actions";

const inventoryReducer = (inventory = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...inventory, action.product];
    case ADD_TO_CART:
      return inventory.map((product) =>
        product.id === action.id
          ? {
              ...product,
              inStock: product.inStock - action.quantity,
            }
          : product
      );
    case REMOVE_FROM_CART:
      return inventory.map((product) =>
        product.id === action.id
          ? {
              ...product,
              inStock: product.inStock + action.quantity,
            }
          : product
      );
    default:
      return inventory;
  }
};

const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let exists = false;
      let new_cart = cart.map((item) => {
        if (item.id === action.id) {
          exists = true;
          return {
            ...item,
            quantity: item.quantity + action.quantity,
          };
        } else return item;
      });
      if (exists) return new_cart;
      else return [{ id: action.id, quantity: action.quantity }, ...cart];
    case REMOVE_FROM_CART:
      return cart.filter((product) => product.id !== action.id);
    case CHECKOUT:
      return [];
    default:
      return cart;
  }
};

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  cart: cartReducer,
});

export default rootReducer;

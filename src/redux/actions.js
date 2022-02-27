export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHECKOUT = "CHECKOUT";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product: product,
  };
};

export const addToCart = (id, quantity) => {
  return {
    type: ADD_TO_CART,
    id: id,
    quantity: quantity,
  };
};

export const removeFromCart = (id, quantity) => {
  return {
    type: REMOVE_FROM_CART,
    id: id,
    quantity: quantity,
  };
};

export const checkout = () => {
  return {
    type: CHECKOUT,
  };
};

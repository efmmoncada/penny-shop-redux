export const getInventory = ({ inventory }) => inventory;

export const getCart = ({ inventory, cart }) => {
  let cartProducts = [];
  console.log(cart);
  if (cart.length > 0) {
    cart.map((item) => {
      cartProducts.push({
        product: inventory[item.id - 1],
        quantity: item.quantity,
      });
    });
  }
  return cartProducts;
};

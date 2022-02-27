/** @jsxImportSource @emotion/react */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { css, jsx } from "@emotion/react";

import { getCart } from "../redux/selectors";
import { checkout, removeFromCart } from "../redux/actions";

import "open-props/style";

const CartModal = (props) => {
  const dispatch = useDispatch();
  const closeIcon = (
    <svg
      onClick={props.showCart}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='24'
      height='24'
      viewBox='0 0 30 30'
      css={css`
        fill: #000000;
      `}
    >
      {" "}
      <path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path>
    </svg>
  );

  const modalStyles = css`
    background-color: white;
    max-width: 50%;
    min-width: 25%;
    height: 100%;
    padding: var(--size-3);
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    animation: var(--animation-slide-in-left);
    overflow-y: scroll;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--size-3);
    }

    .modal-footer {
      font-size: large;
      display: flex;
      justify-content: space-between;

      button {
        font-size: inherit;
      }
    }
  `;

  const cartContents = useSelector(getCart);

  return (
    <div css={modalStyles}>
      <div className='modal-header'>
        <h2>Cart</h2>
        {closeIcon}
      </div>
      <div className='cart-items'>
        {cartContents.length != 0 ? (
          cartContents.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              id={product.id}
              img={product.photoUrl}
              name={product.name}
              quantity={quantity}
              price={product.price}
            />
          ))
        ) : (
          <h3>Your cart is empty.</h3>
        )}
      </div>
      <div className='modal-footer'>
        <p>
          <b>Grand Total: </b>$
          {(() => {
            let totalCost = 0;
            cartContents.map(
              ({ product, quantity }) => (totalCost += product.price * quantity)
            );
            return Number(totalCost).toFixed(2);
          })()}
        </p>
        <button
          disabled={cartContents.length == 0 ? true : false}
          onClick={() => dispatch(checkout())}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

const itemStyles = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-height: var(--size-12);
  border-bottom: var(--size-1) solid rgba(0, 0, 0, 0.2);
  margin: var(--size-3) 0;

  img {
    max-width: 25%;
    object-fit: contain;
    max-height: inherit;
    margin: var(--size-1) 0;
  }
`;

const CartItem = (props) => {
  const dispatch = useDispatch();

  const removeButton = (
    <svg
      onClick={() => dispatch(removeFromCart(props.id, props.quantity))}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='20'
      height='20'
      viewBox='0 0 30 30'
      css={css`
        fill: #000000;
      `}
    >
      {" "}
      <path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path>
    </svg>
  );

  return (
    <div css={itemStyles}>
      {removeButton}
      <img src={props.img} alt='' />
      <h3>{props.name}</h3>
      <span>
        {props.quantity} x ${props.price}
      </span>
      <span>
        <b>Total: </b>${Number(props.price * props.quantity).toFixed(2)}
      </span>
    </div>
  );
};

export default CartModal;

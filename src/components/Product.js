/** @jsxImportSource @emotion/react */

// eslint-disable-next-line
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import { css, jsx } from "@emotion/react";

import { addToCart } from "../redux/actions";

import "open-props/style";

const addIcon = (
  <img
    alt='add to cart'
    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRYhe2WPW7CMBTHf1RISKgTSJ0KDD0CZ0B8DT1UN8RBOEK7da7aKzCEwAAIqQMgJjrYViI3iY2dkCU/ybJlP7/84/f8ARURV63sgDlQL0uAKrN7CdAZSAFbg50Smjs14CSdN4sS8GBwvJbtZ9cP+AgACMsWsJJ1J9anJ6mpXx/v+gpwoSfrPRDEB0x7PCkENc3mmtIfpy/rb33gXiugBPy4CvBNwlQBJtqIJT5k2NicA1sSEtCWo5z86DIZkYDqbvmHKQTgfxakJqCtAN9EzIx/0SvQAl5l+8thPgBvpF/VtmUJNJKc3xICF87AOzAELq5OJoi/+PAQ4sUL0VnQM9gWxifu8c+FJ2AB/JYlAGAKbBCvpImFXQiM8xQQEv1V1s6wtQPstqFCf/342t3MGPGaCYBRDnYVFQD8AXjyhxa9Xs25AAAAAElFTkSuQmCC'
  />
);
const Product = ({ id, name, price, inStock, photoUrl }) => {
  const [quantity, setQuantity] = useState(0);

  const styles = css`
    margin: var(--size-5);
    width: var(--size-fluid-8);

    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-2);
    border-radius: var(
      --radius-2
    ); //? why are only some cards rounded at the top? (if i take off the border rad on the img element)
    background-color: white;

    img {
      flex-grow: 1;
      object-fit: contain;
      border-radius: var(--radius-2);
    }

    .info {
      margin: var(--size-1);
      padding: var(--size-2);
      flex-grow: 0;

      .price {
        float: right;
      }

      .actions {
        display: flex;
        justify-content: space-between;

        * {
          margin: var(--size-4);
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          margin: var(--size-4) 0;
          margin: 0;
          * {
            margin: 0.2em;
          }

          input {
            width: var(--size-8);
            text-align: center;
          }
        }

        .add-to-cart {
          background-color: transparent;
          border: none;
          margin: 0;

          img {
            //? how to get these images to not float above header background in firefox (doesnt happen in safari)
            margin: 0;
            scale: 1.2;
            opacity: ${quantity > inStock || inStock === 0 ? "0.3" : "1"};
          }

          img:hover {
            animation: ${quantity > inStock || inStock === 0
              ? "none"
              : "var(--animation-bounce)"};
          }
        }

        .err {
          margin: 0;
          font-size: small;
          text-align: center;
          color: var(--red-8);
        }
      }
    }
  `;

  const dispatch = useDispatch();

  const decreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevQ) => (prevQ > 0 ? --prevQ : prevQ));
  };
  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevQ) => ++prevQ);
  };

  const updateQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  return (
    <div css={styles}>
      <img alt='candy' src={photoUrl} />
      <div className='info'>
        <span>{name}</span>
        <span className='price'>
          <b>${price}</b>
        </span>
        <p>In Stock: {inStock}</p>
        <div className='actions'>
          <span className='quantity-selector'>
            <button onClick={decreaseQuantity}>-</button>
            <input type='text' value={quantity} onChange={updateQuantity} />
            <button onClick={increaseQuantity}>+</button>
          </span>
          {(quantity > inStock || inStock === 0) && (
            <div className='err'>Insuffient Stock!</div>
          )}
          <button
            className='add-to-cart'
            onClick={() => {
              if (quantity > 0) {
                dispatch(addToCart(id, quantity));
                setQuantity(0);
              }
            }}
            disabled={quantity > inStock || inStock === 0 ? true : false}
          >
            {addIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

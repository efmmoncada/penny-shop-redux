/** @jsxImportSource @emotion/react */

// eslint-disable-next-line
import React from "react";

// eslint-disable-next-line
import { css, jsx } from "@emotion/react";
import { useSelector } from "react-redux";
import { getCart } from "../redux/selectors";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--blue-3);
  padding: var(--size-3) 0;

  h1 {
    font-family: "Shizuru", cursive;
    font-size: var(--font-size-fluid-3);
    color: white;
    margin: 0;
    text-align: center;
    display: inline;
  }

  .cart-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: var(--size-7);

    div {
      color: white;
      font-size: x-large;
    }
  }

  img {
    filter: invert(100);
  }

  img:hover {
    transform: rotateZ(-20deg);
  }
`;

const Navbar = (props) => {
  const cart = useSelector(getCart);

  return (
    <nav css={styles}>
      <h1>Penny Candy Store</h1>
      <div className='cart-button'>
        <div>{cart.length}</div>
        <img
          onClick={() => props.showCart()}
          alt='open cart'
          src='https://img.icons8.com/fluency-systems-regular/72/000000/checkout.png'
        />
      </div>
    </nav>
  );
};

export default Navbar;

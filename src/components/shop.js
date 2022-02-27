/** @jsxImportSource @emotion/react */

// eslint-disable-next-line
import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { css, jsx } from "@emotion/react";
import Product from "./Product";
import { getInventory } from "../redux/selectors";

const Shop = () => {
  const products = useSelector(getInventory);

  const styles = css`
    margin: var(--size-4);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;

  return (
    <div css={styles}>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          inStock={product.inStock}
          photoUrl={product.photoUrl}
        />
      ))}
    </div>
  );
};

export default Shop;

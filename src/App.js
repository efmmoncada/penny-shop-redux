/** @jsxImportSource @emotion/react */

// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import { css, jsx } from "@emotion/react";

import useProducts from "./hooks/useProducts";
import { addProduct } from "./redux/actions";
import Shop from "./components/shop";

import "open-props/style";
import CartModal from "./components/cartModal";
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";

const styles = css`
  display: flex;
  main {
    background-image: var(--gradient-15);
    background-size: cover;
    h3 {
      width: 100vw;
      height: 100vh;
      text-align: center;
    }
  }
`;

function App() {
  const { products, isLoading } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products) products.map((product) => dispatch(addProduct(product)));
  }, [products]);

  return (
    <div css={styles}>
      <main>
        <Navbar showCart={() => setShowModal((prevState) => !prevState)} />
        {isLoading ? <h3>Loading shop...</h3> : <Shop />}
      </main>
      {showModal && (
        <>
          <Backdrop />
          <CartModal showCart={() => setShowModal((prevState) => !prevState)} />
        </>
      )}
    </div>
  );
}

export default App;

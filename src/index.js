import React from "react";
import ReactDOM from "react-dom";
import { css, Global } from "@emotion/react";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

const globalStyles = css`
  @import "open-props/style";
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: "Nunito Sans", sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={globalStyles} />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

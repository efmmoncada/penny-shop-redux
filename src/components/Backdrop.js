/** @jsxImportSource @emotion/react */

import React from "react";

import { css, jsx } from "@emotion/react";

const Backdrop = () => {
  const styles = css`
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
  `;

  return <div css={styles} />;
};

export default Backdrop;

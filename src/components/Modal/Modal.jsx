import styles from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};

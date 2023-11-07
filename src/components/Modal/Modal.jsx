// import { Button } from "../Button/Button";
import styles from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ children, buttonText, onClick, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        {children}
        {/* <Button buttonText="Patvirtinti" onClick={onClick} />
        <Button buttonText="Atšaukti" onClick={() => onClose()} /> */}
      </div>
    </>,
    document.getElementById("portal")
  );
};

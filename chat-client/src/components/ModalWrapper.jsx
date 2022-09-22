import React from "react";
import styles from "./ModalWrapper.module.css";

export const ModalWrapper = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

import React, { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

import { ModalProps } from './types';

import styles from './styles.module.css';

const Modal: FC<ModalProps> = ({ children, title, onClose }) => {
  return (
    <>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <button className={styles.close} onClick={onClose}>
            <FaPlus />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;

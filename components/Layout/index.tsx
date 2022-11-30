import React, { FC } from 'react';
import NavigationBar from '../NavigationBar';
import { LayoutProps } from './types';

import styles from './styles.module.css';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;

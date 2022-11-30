import React, { FC } from 'react';
import {} from '../NavigationBar';
import { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default Layout;

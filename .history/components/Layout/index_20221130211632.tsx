import React, { FC } from 'react';
import NavigationBar from '..';
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

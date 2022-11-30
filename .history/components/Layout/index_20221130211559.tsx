import React, { FC } from 'react';
import { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;

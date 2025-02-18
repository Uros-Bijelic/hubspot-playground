import type { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="min-h-screen">{children}</div>;
};

export default Layout;

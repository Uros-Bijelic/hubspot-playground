import Header from '@/components/layout/Header';
import type { ReactNode } from 'react';

// ----------------------------------------------------------------

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-[min(1280px,100%)] flex-1 flex-col">{children}</main>
    </div>
  );
};

export default Layout;

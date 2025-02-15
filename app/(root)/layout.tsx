import Header from "@/components/layout/Header";
import type { ReactNode } from "react";

// ----------------------------------------------------------------

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <aside>Sidebar</aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

import { ReactNode } from "react";
import Header from "./bars/Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-full h-screen overflow-scroll">
      <div className="absolute top-0 left-0 z-10 w-full">
        <Header />
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;

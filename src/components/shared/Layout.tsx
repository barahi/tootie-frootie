import { ReactNode } from "react";
import Header from "./bars/Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full shrink-0">
        <Header />
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export default Layout;

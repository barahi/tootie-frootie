import { ReactNode } from "react";
import Header from "./bars/Header";

type LayoutParams = {
  children?: ReactNode;
};

function Layout({ children }: LayoutParams) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;

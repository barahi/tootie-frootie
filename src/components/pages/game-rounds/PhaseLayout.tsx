import { ReactNode } from "react";
import Header from "../../shared/bars/Header";

type PhaseLayoutParams = {
  phaseName: String;
  children?: ReactNode;
};

function PhaseLayout({ phaseName, children }: PhaseLayoutParams) {
  return (
    <div className="relative w-full h-screen">
      <header className="absolute top-0 left-0 z-10 w-full">
        <Header />
      </header>
      {/* phase title */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-10">
        <p className="px-4 py-2 text-lg font-thin tracking-wider shadow bg-white/90 rounded-xl">
          {phaseName}
        </p>
      </div>

      {/* main content area to be customized */}
      <main className="pt-[140px] w-full flex justify-center">
        <div className="w-[90%]">{children}</div>
      </main>
    </div>
  );
}

export default PhaseLayout;

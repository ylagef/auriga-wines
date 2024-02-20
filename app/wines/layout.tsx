import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-4xl p-2">
      <main>{children}</main>
    </div>
  );
}

export default WinesLayout;

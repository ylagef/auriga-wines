import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-8">
      <main>{children}</main>
    </div>
  );
}

export default WinesLayout;

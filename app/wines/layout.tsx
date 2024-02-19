import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      WinesLayout
      <main>{children}</main>
    </div>
  );
}

export default WinesLayout;

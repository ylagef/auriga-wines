import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full max-w-4xl px-4 py-2 grow">
        <main>{children}</main>
      </div>
      <footer className="flex items-center justify-center w-full p-2">
        <p className="text-xs text-center opacity-50">
          Todas nuestras botellas pueden ser compradas para consumir fuera del
          local a un menor precio.
        </p>
      </footer>
    </>
  );
}

export default WinesLayout;

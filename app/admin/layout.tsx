import { SignOutButton } from "@/components/SignOutButton";
import Image from "next/image";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-50 flex items-center justify-center w-full px-2 py-3 bg-white/30 backdrop-blur">
        <div className="relative grid w-full h-full place-items-center">
          <Image
            src="/images/auriga-logo.svg"
            alt="Auriga"
            width={200}
            height={37.5}
            className="w-auto h-6"
            priority
          />

          <SignOutButton />
        </div>
      </header>
      <main className="flex items-center justify-center w-full max-w-5xl mx-auto grow">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

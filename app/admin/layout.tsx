import { SignOutButton } from "@/components/SignOutButton";
import Image from "next/image";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto">
      <header className="sticky top-0 z-50 flex items-center justify-center w-full px-2 py-3 bg-white/30 backdrop-blur">
        <div className="relative flex items-center justify-start w-full h-full px-4 sm:justify-center">
          <Image
            src="/images/auriga-logo-wide.svg"
            alt="Auriga"
            width={17}
            height={17}
            className="w-auto h-4 sm:h-6"
            priority
          />

          <SignOutButton />
        </div>
      </header>
      <main className="flex items-center justify-center w-full grow">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

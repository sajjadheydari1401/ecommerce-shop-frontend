"use client";
import { ReactNode } from "react";
import Providers from "./Providers";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div>
        <Navbar />
        <main className="container py-6">{children}</main>
      </div>
    </Providers>
  );
}

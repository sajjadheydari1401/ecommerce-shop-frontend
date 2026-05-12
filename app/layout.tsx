import type { Metadata } from "next";
import ClientLayout from "../components/ClientLayout";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NetworkStatusWrapper } from "@/components/common/NetworkStatusWrapper";

export const metadata: Metadata = {
  title: "E-Commerce Demo",
  description: "Sample e-commerce frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning={true}
      >
        <NetworkStatusWrapper>
          <ClientLayout>{children}</ClientLayout>
        </NetworkStatusWrapper>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}

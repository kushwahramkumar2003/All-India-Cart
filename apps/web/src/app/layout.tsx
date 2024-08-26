import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AllIndiaCart",
  description: "This is E-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto w-full max-w-[65rem] px-4 py-4 mx-auto sm:px-6 md:py-6">
              {children}
            </main>
            <Footer />
            <Toaster richColors />
          </div>
        </Providers>
      </body>
    </html>
  );
}

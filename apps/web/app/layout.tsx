import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { ReactQueryClientProvider } from "@/components/core/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AllIndiaCart",
  description: "This is E-commerce website",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto w-full max-w-[65rem] px-4 py-4 mx-auto sm:px-6 md:py-6">
              {children}
            </main>
            <Footer />
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "./WalletProvider";
const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <WalletProvider>
        {/*<NextThemesProvider attribute="class" defaultTheme="system">*/}
        {children}
        {/*</NextThemesProvider>*/}
        </WalletProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};

export default Providers;

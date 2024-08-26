"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        {/*<NextThemesProvider attribute="class" defaultTheme="system">*/}
        {children}
        {/*</NextThemesProvider>*/}
      </SessionProvider>
    </RecoilRoot>
  );
};

export default Providers;

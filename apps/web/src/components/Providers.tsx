"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
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

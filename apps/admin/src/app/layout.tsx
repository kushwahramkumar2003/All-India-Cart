import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import RecoilRootProvider from '@/app/RecoilRootProvider';
import { SessionProvider } from 'next-auth/react';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ReactQueryClientProvider } from '@/components/core/ReactQueryClientProvider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          {/*<RecoilRootProvider>*/}

          <LocalizationProvider>
            {/*<UserProvider>*/}
            <ThemeProvider>{children}</ThemeProvider>
            {/*</UserProvider>*/}
          </LocalizationProvider>
          {/*</RecoilRootProvider>*/}
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

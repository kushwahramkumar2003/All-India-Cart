'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import { authStateAtom, userAtom } from '@repo/store';
import { useRecoilState } from 'recoil';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const [user, setUserState] = useRecoilState(authStateAtom);
  // const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    // if (isLoading) {
    //   return;
    // }
    //
    // if (error) {
    //   setIsChecking(false);
    //   return;
    // }

    if (!user) {
      console.log('[AuthGuard]: User is not logged in, redirecting to sign in');
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user]);

  if (isChecking) {
    return null;
  }

  if (!user) {
    console.log('[AuthGuard]: User is not logged in, redirecting to sign in');
    router.replace(paths.auth.signIn);
    return null;
  }
  // if (error) {
  //   return <Alert color="error">{error}</Alert>;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}

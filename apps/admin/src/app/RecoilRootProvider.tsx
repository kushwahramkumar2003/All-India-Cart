'use client';

import { RecoilRoot } from 'recoil';

const RecoilRootProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;

import React, { ReactNode } from 'react';

import { Header } from '@/components/shared/Header'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
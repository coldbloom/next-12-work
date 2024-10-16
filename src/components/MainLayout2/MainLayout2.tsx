import React, { ReactNode } from 'react';
import s from './MainLayout2.module.scss'

import { Header } from '@/components/shared/Header'

export const MainLayout2 = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.container}>
      <Header />
      {children}
    </div>
  );
};
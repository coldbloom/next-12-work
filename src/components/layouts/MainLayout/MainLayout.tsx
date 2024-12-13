import React, { ReactNode } from 'react';
import s from './MainLayout.module.scss'

import { Header } from '@/components/shared/Header'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.container}>
      <Header />
      {children}
    </div>
  );
};
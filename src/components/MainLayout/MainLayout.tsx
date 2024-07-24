import React, { ReactNode } from 'react';
import s from './MainLayout.module.scss';
import { BottomNav } from "../BottomNav";

type MainLayout = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayout) => {
  return (
    <div className={s['layout-container']}>
      <div className={s['absolute-full']}>
        <div className={s['scroll-container']}>
          {children}
          <BottomNav />
        </div>
      </div>
    </div>
  );
};
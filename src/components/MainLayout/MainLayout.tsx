import React, { ReactNode } from 'react';
import s from './MainLayout.module.scss'

type MainLayout = {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayout) => {
  return (
    <div className={s.wrapper}>
      <div className={s['layout-container']}>
        <div className={s['absolute-full']}>
          <div className={s['scroll-container']}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
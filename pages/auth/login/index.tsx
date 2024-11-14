import React from 'react';
import { MainLayout2 } from "@/components/MainLayout2";
import s from './Login.module.scss';

const Login = () => {
  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <h1>Войдите в аккаунт чтобы бронировать и создавать поездки</h1>
      </div>
    </MainLayout2>
  );
};

export default Login;
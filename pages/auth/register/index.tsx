import { mdiEmailOutline } from '@mdi/js';
import Icon from "@mdi/react";

import React from 'react';
import { MainLayout2 } from "@/components/MainLayout2";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";

import s from './Register.module.scss';
import cn from 'classnames';

const Register = () => {
  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <HeadingText variant="dark">Регистрация</HeadingText>
        <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
        <button>
          <Icon path={mdiEmailOutline} size="24px"/>
          Использовать адрес эл. почты
        </button>
        <button>
          Продолжить с Google
        </button>
        <button>
          Продолжить с Вконтакте
        </button>
        <button>
          Продолжить с @Mail.ru
        </button>
      </div>
    </MainLayout2>
  );
};

export default Register;
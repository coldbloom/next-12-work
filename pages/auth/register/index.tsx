import { mdiEmailOutline } from '@mdi/js';
import Icon from "@mdi/react";

import { MainLayout2 } from "@/components/MainLayout2";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import {useRouter} from "next/router";

import s from './Register.module.scss';
import AuthFooter from "@/components/shared/AuthFooter";

const Register = () => {
  const router = useRouter();
  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <HeadingText variant="dark">Регистрация</HeadingText>
          <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
          <button onClick={() => router.push("/auth/register/email")} className={s.authButton}>
            <Icon path={mdiEmailOutline} size="24px"/>
            Использовать адрес эл. почты
          </button>
          <button className={s.authButton}>
            Продолжить с Google
          </button>
          <button className={s.authButton}>
            Продолжить с Вконтакте
          </button>
          <button className={s.authButton}>
            Продолжить с @Mail.ru
          </button>
        </div>

        <AuthFooter />
      </div>
    </MainLayout2>
  );
};

export default Register;
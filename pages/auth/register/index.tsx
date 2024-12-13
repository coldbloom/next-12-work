import { mdiEmailOutline } from '@mdi/js';
import Icon from "@mdi/react";

import { MainLayout } from "src/components/layouts/MainLayout";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import {useRouter} from "next/router";

import s from './Register.module.scss';
import AuthFooter from "@/components/shared/AuthFooter";
import {AuthButton} from "@/components/shared/AuthButton";
import {GoogleAuthButton} from "@/components/shared/GoogleAuthButton";
import {AuthSeparator} from "@/components/shared/AuthSeparator/AuthSeparator";

const Register = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <HeadingText variant="dark">Регистрация</HeadingText>
          <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
          <AuthButton onClick={() => router.push("/auth/register/email")} variant="local">
            <Icon path={mdiEmailOutline} size="24px" style={{ marginRight: "4px" }}/>
            Email и пароль
          </AuthButton>
          <AuthSeparator />
          <GoogleAuthButton />
        </div>

        <AuthFooter variant="login"/>
      </div>
    </MainLayout>
  );
};

export default Register;
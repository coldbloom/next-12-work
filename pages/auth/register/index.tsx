import { mdiEmailOutline } from '@mdi/js';
import Icon from "@mdi/react";

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

import { MainLayout } from "src/components/layouts/MainLayout";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { AuthFooter } from "@/components/shared/AuthFooter";
import { AuthButton } from "@/components/shared/AuthButton";
import { GoogleAuthButton } from "@/components/shared/GoogleAuthButton";
import { AuthSeparator } from "@/components/shared/AuthSeparator/AuthSeparator";

import s from './Register.module.scss';

const Register = () => {
  const router = useRouter();
  const { isUserLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLogged) {
      router.push("/");
    }
  },[isUserLogged]);

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
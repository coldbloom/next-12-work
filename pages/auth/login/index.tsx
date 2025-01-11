import { mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

import { MainLayout } from "src/components/layouts/MainLayout";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { GoogleAuthButton } from "@/components/shared/GoogleAuthButton";
import { AuthSeparator } from "@/components/shared/AuthSeparator/AuthSeparator";
import { AuthButton } from "@/components/shared/AuthButton";
import { AuthFooter } from "@/components/shared/AuthFooter";

import s from '../register/Register.module.scss';

const Login = () => {
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
          <HeadingText variant="dark">Вход</HeadingText>
          <p>Войдите в аккаунт чтобы бронировать и создавать поездки</p>
          <AuthButton onClick={() => router.push("/auth/login/email")} variant="local">
            <Icon path={mdiEmailOutline} size="24px" style={{ marginRight: "4px" }} />
            Email и пароль
          </AuthButton>
          <AuthSeparator />
          <GoogleAuthButton />
        </div>

        <AuthFooter variant="register" />
      </div>
    </MainLayout>
  );
};

export default Login;
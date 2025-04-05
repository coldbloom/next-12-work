import { mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { GoogleAuthButton } from "@/components/shared/GoogleAuthButton";
import { AuthSeparator } from "@/components/shared/AuthSeparator/AuthSeparator";
import { AuthButton } from "@/components/shared/AuthButton";


const Login = () => {
  const router = useRouter();
  const { isUserLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLogged) {
      router.push("/")
    }
  },[isUserLogged]);

  return (
    <AuthLayout
      variant="register"
      title="Вход в БлаБлаАвто"
      description="Войдите в аккаунт чтобы бронировать и создавать поездки"
    >
      <>
        <AuthButton onClick={() => router.push("/auth/login/email")} variant="local">
          <Icon path={mdiEmailOutline} size="24px" style={{marginRight: "4px"}}/>
          Email и пароль
        </AuthButton>
        <AuthSeparator/>
        <GoogleAuthButton/>
      </>
    </AuthLayout>
  );
};

export default Login;
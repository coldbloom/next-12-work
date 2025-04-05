import { mdiEmailOutline } from '@mdi/js';
import Icon from "@mdi/react";

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

import { AuthButton } from "@/components/shared/AuthButton";
import { GoogleAuthButton } from "@/components/shared/GoogleAuthButton";
import { AuthSeparator } from "@/components/shared/AuthSeparator/AuthSeparator";
import { AuthLayout } from "@/components/layouts/AuthLayout";

const Register = () => {
  const router = useRouter();
  const { isUserLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLogged) {
      router.push("/");
    }
  },[isUserLogged]);

  return (
    <AuthLayout
      variant="login"
      title="Регистрация в БлаБлаАвто"
      description="Создайте аккаунт чтобы бронировать и создавать поездки"
    >
      <>
        <AuthButton onClick={() => router.push("/auth/register/email")} variant="local">
          <Icon path={mdiEmailOutline} size="24px" style={{ marginRight: "4px" }}/>
          Email и пароль
        </AuthButton>
        <AuthSeparator />
        <GoogleAuthButton />
      </>
    </AuthLayout>
  );
};

export default Register;
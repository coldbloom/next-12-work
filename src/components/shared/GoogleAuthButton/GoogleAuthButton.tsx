import { AuthButton } from "@/components/shared/AuthButton";
import Image from "next/image";
import googleIcon from "@/../public/google-g-2015.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import {AuthContext, instanceAxios} from "@/context/AuthContext";
import {useContext} from "react";

type GmailData = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  picture: string;
  sub: string;
};

export const GoogleAuthButton = () => {

  const { handleGoogleSign } = useContext(AuthContext);
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await handleGoogleSign({ token: response.access_token });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <AuthButton onClick={() => handleGoogleLogin()} variant="google">
      <Image src={googleIcon} alt="google" width={24} height={24} style={{margin: "0 6px 0 6px"}}/>
      <span>Вход через аккаунт Google</span>
    </AuthButton>
  );
};

{/*<GoogleLogin*/}
{/*  onSuccess={(credentialResponse) => {*/}
{/*    if (credentialResponse.credential) {*/}
{/*      const credential = jwtDecode(credentialResponse.credential);*/}
{/*      console.log("credential", credential);*/}
{/*    }*/}
{/*  }}*/}
{/*  onError={() => console.log("Login failed")}*/}
{/*/>*/}
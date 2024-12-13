import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import AuthProvider, {AuthContext} from "@/context/AuthContext";
import { SpeedInsights } from '@vercel/speed-insights/next'; // FIXME от vercel
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {useContext} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, handleSignUp } = useContext(AuthContext);
  // console.log(data);
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="435189959290-jji28hv7ubter1n0l56rnoggmphpekuj.apps.googleusercontent.com">
        <SnackbarProvider>
          <Component {...pageProps} />
          <SpeedInsights />
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}

export default MyApp

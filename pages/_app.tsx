import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Inter, Roboto } from 'next/font/google'

import AuthProvider, {AuthContext} from "@/context/AuthContext";
import { SpeedInsights } from '@vercel/speed-insights/next'; // FIXME от vercel
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {useContext} from "react";

// Настройка шрифта Inter с явным указанием переменной
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter', // Обязательно нужно указать эту опцию
})

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, handleSignUp } = useContext(AuthContext);
  // console.log(data);
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="435189959290-jji28hv7ubter1n0l56rnoggmphpekuj.apps.googleusercontent.com">
        <SnackbarProvider>
          <style jsx global>{`
            html, body {
              font-family: ${inter.style.fontFamily};
              -webkit-font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
              padding: 0;
              margin: 0;
            }

            * {
              font-family: ${inter.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
          <SpeedInsights/>
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}

export default MyApp

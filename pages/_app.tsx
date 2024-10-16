import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { MainLayout } from "@/components/MainLayout";
import { MainLayout2 } from "@/components/MainLayout2";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout2>
      <Component {...pageProps} />
    </MainLayout2>
  )
}

export default MyApp

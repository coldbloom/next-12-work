import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { MainLayout } from "@/components/MainLayout";
import { SpeedInsights } from '@vercel/speed-insights/next'; // FIXME от vercel

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}

export default MyApp

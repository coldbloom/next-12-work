import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { MainLayout } from "@/components/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

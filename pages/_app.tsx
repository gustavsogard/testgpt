import type { AppProps } from 'next/app'
import 'styles/globals.css'
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <ToastContainer />
    </main>
  )
}

import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

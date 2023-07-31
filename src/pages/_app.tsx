import '../styles/global.css';

import type { AppProps } from 'next/app';

import { WelcomeProvider } from '@/context/welcome-context';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WelcomeProvider>
    <ContainerMyApp pageProps={pageProps} Component={Component} />
  </WelcomeProvider>
);

const ContainerMyApp = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default MyApp;

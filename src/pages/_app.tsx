import '../styles/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import type { AppProps } from 'next/app';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NotificationConfirmOperation } from '@/components/base';
import { Loading } from '@/components/base/loading';
import { MainContext, MainProvider } from '@/context/main-context';
import Redux from '@/redux';

const { store, persistor } = Redux();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainProvider>
        <ContainerMyApp pageProps={pageProps} Component={Component} />
      </MainProvider>
    </PersistGate>
  </Provider>
);

const ContainerMyApp = ({ Component, pageProps }: any) => {
  const { loadingstartnow, contentconfirm } = useContext(MainContext);
  return (
    <>
      {loadingstartnow ? <Loading /> : null}
      {contentconfirm.length !== 0 ? <NotificationConfirmOperation /> : null}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

import '../styles/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  AddFellowCompanions,
  NotificationConfirmOperation,
} from '@/components/base';
import { Loading } from '@/components/base/loading';
import { NotificationDeleteUser } from '@/components/NotificationDeleteUser';
import { NotiFinishTheTrip } from '@/components/pages';
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
  const {
    loadingstartnow,
    contentconfirm,
    finishthetrip,
    showaddfellowcompanions,
    valeudeleteuser,
  } = useContext(MainContext);
  const router = useRouter();
  return (
    <>
      <Head>
        {router.asPath === '/' ? <title>My Trip Cost</title> : null}
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script>{`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}</script>
      </Head>
      {loadingstartnow ? <Loading /> : null}
      {finishthetrip.value ? (
        <NotiFinishTheTrip value={finishthetrip.value} />
      ) : null}
      {showaddfellowcompanions ? <AddFellowCompanions /> : null}
      {valeudeleteuser.name !== '' ? <NotificationDeleteUser /> : null}
      {contentconfirm.length !== 0 ? <NotificationConfirmOperation /> : null}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

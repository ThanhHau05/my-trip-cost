import { useSelector } from 'react-redux';

import { Header, WrapperHeader } from '@/components/layout';
import { SliderPage } from '@/components/pages';
import { HomeProvider } from '@/context/home-context';
import { selector } from '@/redux';

import { Welcome } from './welcome';

export const Home = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation.name ? (
    <HomeProvider>
      <ContainerHome />
    </HomeProvider>
  ) : (
    <Welcome />
  );
};

const ContainerHome = () => {
  const { currentUserInformation } = useSelector(selector.user);

  return (
    <WrapperHeader
      header={
        <Header
          id={currentUserInformation.ID}
          image={currentUserInformation.image}
          name={currentUserInformation.name}
          email={currentUserInformation.gmail}
        />
      }
    >
      <SliderPage />
    </WrapperHeader>
  );
};

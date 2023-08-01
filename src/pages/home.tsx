import { useSelector } from 'react-redux';

import { Wrapper } from '@/components/layout';
import { selector } from '@/redux';

import { Welcome } from './welcome';

export const Home = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation.name ? <ContainerHome /> : <Welcome />;
};

const ContainerHome = () => {
  return (
    <Wrapper>
      <h2>HIIII</h2>
    </Wrapper>
  );
};

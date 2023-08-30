import { useSelector } from 'react-redux';

import { ContainerHome } from '@/components/pages';
import { selector } from '@/redux';

import Welcome from './welcome';

const HomePage = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation?.uid ? <ContainerHome /> : <Welcome />;
};

export default HomePage;

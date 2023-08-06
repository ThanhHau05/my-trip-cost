import { useContext } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { VerticalMenu } from '@/components/base';
import { Header, WrapperHeader } from '@/components/layout';
import { CreateTheTrip, SliderPage } from '@/components/pages';
import { VERTICAL_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth } from '@/firebase';
import { selector, UserActions } from '@/redux';

import { Welcome } from './welcome';

const HomePage = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation?.displayName ? <ContainerHome /> : <Welcome />;
};

const ContainerHome = () => {
  const { currentUserInformation } = useSelector(selector.user);
  const { showverticalmenu, showcreatethetrip } = useContext(MainContext);

  return (
    <WrapperHeader
      header={
        <Header
          id={currentUserInformation?.id}
          image={currentUserInformation?.photoURL}
          name={currentUserInformation?.displayName}
          email={currentUserInformation?.email}
        />
      }
    >
      <div className="h-full">
        {showverticalmenu ? (
          <VerticalMenu>
            <RenderItemVerticalMenuHome />
          </VerticalMenu>
        ) : null}
        {showcreatethetrip ? <CreateTheTrip /> : null}
        <SliderPage />
      </div>
    </WrapperHeader>
  );
};

const RenderItemVerticalMenuHome = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();

  const onSubmit = async (value: string) => {
    if (value === 'sign out') {
      await signOut();
      dispatch(
        UserActions.setCurrentUserInformation({
          displayName: '',
          id: 0,
          photoURL: {
            url: undefined,
            color: undefined,
            text: undefined,
          },
          email: '',
        }),
      );
    }
  };
  return (
    <div className="flex flex-col">
      {VERTICAL_MENU.map((item) => (
        <div
          key={item.value}
          className="mb-2 flex cursor-pointer items-center justify-start rounded-xl bg-slate-300 py-2"
          onClick={() => onSubmit(item.value)}
        >
          {item.icon ? (
            <item.icon className="mx-2 text-xl text-gray-900" />
          ) : null}
          <h2 className="select-none">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

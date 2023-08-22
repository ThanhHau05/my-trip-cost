import { useContext } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import { VERTICAL_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth } from '@/firebase';

import { onSubmit } from './handler';

export const RenderItemVerticalMenuHome = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();

  const { setShowVerticalMenu, setShowTripHistory } = useContext(MainContext);

  return (
    <div className="flex flex-col">
      {VERTICAL_MENU.map((item) => (
        <div
          key={item.value}
          className="mb-2 flex cursor-pointer items-center justify-start rounded-xl bg-slate-300 p-2"
          onClick={() =>
            onSubmit({
              value: item.value.toString(),
              dispatch,
              setShowTripHistory,
              setShowVerticalMenu,
              signOut,
            })
          }
        >
          {item.icon ? (
            <item.icon className="mr-2 text-xl text-gray-900" />
          ) : null}
          <h2 className="select-none">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

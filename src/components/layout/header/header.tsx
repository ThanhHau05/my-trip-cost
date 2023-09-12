import { useContext } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { MainContext } from '@/context/main-context';
import { auth } from '@/firebase';

import { handleSignOut } from '../handle-layout';

export const Header = ({ name }: { name: string }) => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();
  const { setLoadingStartNow } = useContext(MainContext);
  return (
    <div className="flex h-20 w-full items-center justify-between px-3 py-2">
      <div className="flex items-center justify-center">
        <div className="pl-3">
          <h2 className="text-2xl font-bold leading-5 text-gray-900 drop-shadow-md">
            Hello {name}
          </h2>
          <span className="break-words text-sm text-gray-900 drop-shadow-md ">
            Wish you have a pleasant trip!
          </span>
        </div>
      </div>
      <FaSignOutAlt
        onClick={() => {
          handleSignOut({ signOut, dispatch, setLoading: setLoadingStartNow });
        }}
        className="cursor-pointer text-2xl text-gray-700 transition-all hover:text-[28px] hover:text-gray-800"
      />
      {/* <ImageUser image={image} id={id} name={name} /> */}
    </div>
  );
};

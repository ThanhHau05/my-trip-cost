import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/base';
import { Wrapper } from '@/components/layout';
import { auth, DataFirebase } from '@/firebase';
import { useChangeNameStyle } from '@/hooks/useChangeNameStyle';
import { ImagesWelcomePage } from '@/public/images';
import { UserActions } from '@/redux';

export const ContainerWelcome = ({
  setCheckCreateNow,
  setCheckLogin,
}: {
  setCheckCreateNow: (value: boolean) => void;
  setCheckLogin: (value: boolean) => void;
}) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handle = async () => {
      if (user?.user) {
        if (user.user.email) {
          if (!(await DataFirebase.useCheckEmail(user.user.email))) {
            await DataFirebase.useAddEmailCheck(user.user.email);
            const id = await DataFirebase.useRandomID();
            DataFirebase.useAddUserInformationIntoData(
              useChangeNameStyle(user?.user.displayName || ''),
              id,
              user?.user.email || '',
              user?.user.photoURL || '',
              '',
              '',
              user?.user.uid,
              [],
            );
            dispatch(
              UserActions.setCurrentUserInformation({
                displayName: useChangeNameStyle(user?.user.displayName || ''),
                id,
                photoURL: {
                  color: '',
                  text: '',
                  url: user?.user.photoURL || '',
                },
                uid: user?.user.uid,
                status: false,
              }),
            );
          } else {
            const userlist = await DataFirebase.useGetUserList();
            const value = userlist.find(
              (item) => item.email === user.user.email,
            );
            if (value?.id) {
              dispatch(
                UserActions.setCurrentUserInformation({
                  displayName: useChangeNameStyle(user?.user.displayName || ''),
                  id: value?.id,
                  photoURL: {
                    color: '',
                    text: '',
                    url: user?.user.photoURL || '',
                  },
                  uid: user?.user.uid,
                  status: false,
                }),
              );
            }
          }
        }
      }
    };
    handle();
  }, [user]);

  return (
    <Wrapper>
      <div className="relative h-full">
        <img src={ImagesWelcomePage.Background.src} alt="" />
        <div className="absolute bottom-0 z-10 flex h-[357px] w-full flex-col rounded-t-[40px] bg-gradient-to-b from-teal-500 to-teal-400 px-5 pt-5 shadow-xl drop-shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-md">
              Welcome
            </h2>
            <span className="mt-1 block text-gray-800 drop-shadow-sm">
              Plan and list all the expenses for your trip right away!
            </span>
          </div>
          <div className="pt-12">
            <div className="flex flex-col gap-2">
              <div className="flex w-full flex-col justify-center">
                <div className="h-12 w-full">
                  <Button
                    onClick={() => setCheckLogin(true)}
                    title="Sign in with Account"
                  />
                </div>
                <div className="w-full text-center">
                  <h2 className="inline-block cursor-pointer pt-2 text-sm text-gray-800">
                    Do not have a account?{' '}
                    <span
                      onClick={() => setCheckCreateNow(true)}
                      className="text-base font-medium text-blue-700 hover:underline hover:underline-offset-2"
                    >
                      Create now!
                    </span>
                  </h2>
                </div>
              </div>
              <h2 className="text-center">OR</h2>
              <div className="flex w-full justify-center">
                <div className="h-12 w-full">
                  <Button
                    onClick={() => signInWithGoogle()}
                    title="Sign in with Google"
                    bgWhite
                    icon={FcGoogle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

import { useEffect, useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/base';
import { Wrapper } from '@/components/layout';
import { AddPersonalInformation } from '@/components/pages';
import { auth, DataFirebase } from '@/firebase';
import { ImagesWelcomePage } from '@/public/images';
import { UserActions } from '@/redux';

export const Welcome = () => {
  const [ischeckcreatenow, setIsCheckCreateNow] = useState(false);

  return !ischeckcreatenow ? (
    <AddPersonalInformation ischeckcreatenow={ischeckcreatenow} />
  ) : (
    <ContainerWelcome setCheckSubmit={setIsCheckCreateNow} />
  );
};

const ContainerWelcome = ({
  setCheckSubmit,
}: {
  setCheckSubmit: (value: boolean) => void;
}) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handle = async () => {
      if (user?.user) {
        const id = await DataFirebase.useRandomID();
        DataFirebase.useAddUserInformationIntoData(
          user?.user.displayName || '',
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
            displayName: user?.user.displayName || '',
            email: user?.user.email || '',
            id,
            photoURL: {
              color: '',
              text: '',
              url: user?.user.photoURL || '',
            },
          }),
        );
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
                    // onClick={() =>
                    //   // onSubmitContinue(name, setName, setId, setCheckSubmit)
                    // }
                    title="Sign in with Account"
                  />
                </div>
                <div className="w-full text-center">
                  <h2 className="inline-block cursor-pointer pt-2 text-sm text-gray-800">
                    Do not have a account?{' '}
                    <span
                      onClick={() => setCheckSubmit(true)}
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

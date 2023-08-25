import clsx from 'clsx';
import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/base';
import { auth } from '@/firebase';

import { handleContainerWelcome } from './handler';

export const SignIn = ({
  show,
  setCheckLogin,
  setCheckCreateNow,
}: {
  show: boolean;
  setCheckLogin: (value: boolean) => void;
  setCheckCreateNow: (value: boolean) => void;
}) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    handleContainerWelcome({ user, dispatch });
  }, [user]);

  return (
    <div
      className={clsx(
        'pt-5 transition-all duration-200',
        show ? 'visible static opacity-100' : 'invisible absolute opacity-0',
      )}
    >
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
  );
};

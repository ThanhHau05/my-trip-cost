import { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { GrLinkPrevious } from 'react-icons/gr';

import { Button, Input } from '@/components/base';
import { Wrapper } from '@/components/layout';
import { MainContext } from '@/context/main-context';
import { auth, DataFirebase } from '@/firebase';

export const LoginByAccount = ({
  setBackToMainPage,
}: {
  setBackToMainPage: (value: boolean) => void;
}) => {
  const { AddUserInformationIntoRedux } = useContext(MainContext);
  const [signInWithEmailAndPassword, user, , error] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  useEffect(() => {
    if (error?.code.includes('user-not-found')) {
      setPassword({ ...email, error: 'Wrong password' });
    }
  }, [error]);

  useEffect(() => {
    if (user?.user) {
      const handle = async () => {
        const userlist = await DataFirebase.useGetUserList();
        if (userlist) {
          const value = userlist.find((item) => item.email === email.value);
          if (value) {
            AddUserInformationIntoRedux(
              value.id,
              value.photoURL.url || '',
              value.photoURL.color || '',
              value.photoURL.text || '',
              user.user.displayName || '',
              user.user.email || '',
              value.uid,
            );
          }
        }
      };
      handle();
    }
  }, [user]);

  const isCheck = async () => {
    let isError = false;
    if (!email.value) {
      isError = true;
      setEmail({ value: '', error: 'Please enter your email' });
    } else if (email && !(await DataFirebase.useCheckEmail(email.value))) {
      isError = true;
      setEmail({ ...email, error: "This email dosen't exist" });
    }
    if (!password.value) {
      isError = true;
      setPassword({ value: '', error: 'Please enter your password' });
    }
    return !isError;
  };

  const onSubmit = async () => {
    if (await isCheck()) {
      signInWithEmailAndPassword(email.value, password.value);
    }
  };

  return (
    <Wrapper>
      <div className="h-full w-full">
        <div className="relative h-full w-full bg-slate-50">
          <GrLinkPrevious
            onClick={() => setBackToMainPage(false)}
            className="absolute left-0 top-0 ml-3 mt-3 cursor-pointer rounded-full border-2 bg-slate-50 p-1 text-3xl text-gray-900 hover:bg-slate-100"
          />
          <div className="border_welcome_top absolute right-0 top-9 h-56 w-40 bg-teal-500" />
          <div className="border_welcome_bottom absolute -left-16 bottom-8 h-56 w-52 bg-teal-500" />
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-5">
            <h2 className="text-3xl font-bold text-cyan-800 drop-shadow-md">
              Sign In
            </h2>
            <div className="h-[118px] w-full">
              <Input
                onChangeText={(e) => setEmail({ value: e, error: '' })}
                title="Email"
                value={email.value}
                error={email.error}
                placeholder="example@email.com"
              />
            </div>
            <div className="h-[118px] w-full">
              <Input
                onChangeText={(e) => setPassword({ value: e, error: '' })}
                title="Password"
                value={password.value}
                error={password.error}
              />
            </div>
            <div className="h-12 w-full">
              <Button onClick={onSubmit} title="Sign In" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

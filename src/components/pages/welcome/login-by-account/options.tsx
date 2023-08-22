import { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { Button, Input } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { auth } from '@/firebase';

import { handleAddUserIntoRedux, onSubmitLoginByAccount } from '../handler';

export const OptionsLoginByAccount = () => {
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
    handleAddUserIntoRedux({
      AddUserInformationIntoRedux,
      email: email.value,
      user,
    });
  }, [user, email.value]);

  return (
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
          type="password"
        />
      </div>
      <div className="h-12 w-full">
        <Button
          onClick={() =>
            onSubmitLoginByAccount({
              signInWithEmailAndPassword,
              email,
              password: password.value,
              setEmail,
              setPassword,
            })
          }
          title="Sign In"
        />
      </div>
    </div>
  );
};

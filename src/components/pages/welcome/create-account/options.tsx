import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';

import { Button, Input } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { useChangeNameStyle } from '@/hooks/useChangeNameStyle';

export const Options = ({
  name,
  setName,
  error,
  image,
}: {
  name: string;
  setName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  error: string;
  image: {
    url: string;
    color: string;
    text: string;
  };
}) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { onSubmitStartNow } = useContext(MainContext);

  return (
    <div className="w-full px-5">
      <div className="mt-3">
        <div className="h-[118px]">
          <Input
            onChangeText={(e) =>
              setName({ value: useChangeNameStyle(e), error: '' })
            }
            title="Your name"
            value={name}
            error={error}
            maxLength={15}
          />
        </div>
        <div className="h-[118px]">
          <Input
            title="Email"
            onChangeText={(e) => setEmail({ value: e, error: '' })}
            value={email.value}
            error={email.error}
          />
        </div>
        <div className="h-[118px]">
          <Input
            title="Password"
            otherType="password"
            onChangeText={(e) => setPassword({ value: e, error: '' })}
            value={password.value}
            error={password.error}
          />
        </div>
        <div className="mt-3 h-12">
          <Button
            onClick={() => {
              onSubmitStartNow(
                name,
                setName,
                email.value,
                setEmail,
                password.value,
                setPassword,
                image.url,
                image.color,
                image.text,
              );
            }}
            title="Sign Up"
          />
        </div>
      </div>
    </div>
  );
};

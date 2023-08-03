import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';

import { Button, Input } from '@/components/base';
import { Wrapper } from '@/components/layout';
import { AddPersonalInformation } from '@/components/pages';
import { MainContext } from '@/context/main-context';
import { ImagesWelcomePage } from '@/public/images';

export const Welcome = () => {
  const [isCheckContinue, setIsCheckContinue] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [id, setId] = useState(0);

  return isCheckContinue && id ? (
    <AddPersonalInformation
      isCheckContinue={isCheckContinue}
      name={name.value}
      id={id}
    />
  ) : (
    <ContainerWelcome
      setName={setName}
      name={name}
      setCheckSubmit={setIsCheckContinue}
      setId={setId}
    />
  );
};

const ContainerWelcome = ({
  setName,
  name,
  setCheckSubmit,
  setId,
}: {
  setName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  name: { value: string; error: string };
  setCheckSubmit: (value: boolean) => void;
  setId: Dispatch<SetStateAction<number>>;
}) => {
  const { onSubmitContinue } = useContext(MainContext);

  return (
    <Wrapper>
      <div className="relative h-full">
        <img className="pt-3" src={ImagesWelcomePage.Background.src} alt="" />
        <div className="absolute bottom-0 z-10 flex h-[357px] w-full flex-col justify-between rounded-t-[40px] bg-gradient-to-b from-teal-500 to-teal-400 px-5 pt-5 shadow-xl drop-shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-md">
              Welcome
            </h2>
            <span className="mt-1 block font-medium text-gray-800 drop-shadow-sm">
              Plan and list all the expenses for your trip right away!
            </span>
          </div>
          <div className="mb-3 h-[117px]">
            <Input
              onChangeText={(e) => setName({ value: e, error: '' })}
              title="Your name"
              value={name.value}
              error={name.error}
              maxLength={20}
              placeholder="What's your name ?"
              noSpaces
            />
          </div>
          <div className="flex w-full justify-center pb-8">
            <div className="h-12 w-full">
              <Button
                onClick={() =>
                  onSubmitContinue(name, setName, setId, setCheckSubmit)
                }
                title="Continue"
                bgWhite
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

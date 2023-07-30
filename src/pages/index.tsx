import { useContext } from 'react';

import { Button, Input } from '@/components/base';
import { ImagesHome } from '@/components/images';
import { Wrapper } from '@/components/layout';
import { WelcomeContext, WelcomeProvider } from '@/context/welcome-context';

const Welcome = () => {
  return (
    <WelcomeProvider>
      <ContainerWelcome />
    </WelcomeProvider>
  );
};

const ContainerWelcome = () => {
  const { setName, name, onSubmit } = useContext(WelcomeContext);
  return (
    <Wrapper>
      <div className="relative h-full">
        <img className="pt-3" src={ImagesHome.Background4.src} alt="" />
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
              <Button onClick={onSubmit} title="Continue" bgWhite />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Welcome;

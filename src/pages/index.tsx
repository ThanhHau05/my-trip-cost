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
        <img src={ImagesHome.Background3.src} alt="" />
        <div className="absolute bottom-0 flex h-[357px] w-full flex-col justify-between rounded-t-[40px] border-t-2 border-t-slate-100 bg-gradient-to-b from-teal-500 to-teal-400 px-5 pt-5 shadow-xl">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome</h2>
            <span className="mt-1 block font-medium text-gray-800">
              Plan and list all the expenses for your trip right away!
            </span>
          </div>
          <div className="h-[117px]">
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
              <Button onClick={onSubmit} title="START NOW" bgWhite />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Welcome;

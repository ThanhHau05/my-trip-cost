import { useContext, useEffect, useMemo, useState } from 'react';
import { GrLinkPrevious } from 'react-icons/gr';

import { Wrapper } from '@/components/layout';
import { MainContext } from '@/context/main-context';
import { ImagesWelcomePage } from '@/public/images';

import { getRandomColor } from '../hook';
import { AvatarCreateAccount } from './avatar';
import { Options } from './options';

export const CreateAccount = ({
  setBackToMainPage,
  ischeckcreatenow,
}: {
  setBackToMainPage: (value: boolean) => void;
  ischeckcreatenow: boolean;
}) => {
  const { name, setName } = useContext(MainContext);
  const [image, setImage] = useState({
    url: '',
    color: '',
    text: '',
  });

  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  useEffect(() => {
    setImage({
      url: '',
      color,
      text: name.value[0] ? name.value[0].toUpperCase() : 'A',
    });
  }, [ischeckcreatenow, name.value, color]);

  return (
    <Wrapper>
      <div className="relative h-full">
        <div className="relative">
          <img src={ImagesWelcomePage.Background2.src} alt="" />
          <GrLinkPrevious
            onClick={() => setBackToMainPage(false)}
            className="absolute left-0 top-0 ml-3 mt-3 cursor-pointer rounded-full border-2 bg-slate-50 p-1 text-3xl text-gray-900 shadow-md hover:bg-slate-100"
          />
          <h2 className="absolute top-0 mt-10 w-full text-center text-2xl font-bold uppercase drop-shadow-md">
            Create Account
          </h2>
        </div>
        <div className="absolute top-1/4 h-[536px] w-full rounded-t-[40px] bg-slate-100 shadow-md">
          <div className="border_welcome_bottom absolute bottom-8 left-0 h-56 w-44 bg-teal-500" />
          <div className="border_welcome_top absolute right-0 top-9 h-56 w-40 bg-teal-500" />
          <div className="absolute top-[-70px] z-10 flex h-full w-full flex-col items-center">
            <AvatarCreateAccount image={image} setImage={setImage} />
            <Options
              name={name.value}
              setName={setName}
              error={name.error}
              image={image}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

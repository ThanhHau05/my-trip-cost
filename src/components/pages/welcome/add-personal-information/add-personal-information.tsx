import { useContext, useEffect, useMemo, useState } from 'react';

import { Wrapper } from '@/components/layout';
import { MainContext } from '@/context/main-context';
import { ImagesWelcomePage } from '@/public/images';

import { getRandomColor } from '../hook';
import { Avatar } from './avatar';
import { Options } from './options';

export const AddPersonalInformation = ({
  ischeckcreatenow,
}: {
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
      <div className="relative h-full w-full">
        <div className="relative">
          <img src={ImagesWelcomePage.Background2.src} alt="" />
          <h2 className="absolute top-0 mt-10 w-full text-center text-2xl font-bold uppercase drop-shadow-md">
            Add Personal Information
          </h2>
        </div>
        <div className="absolute top-1/4 h-[536px] w-full rounded-t-[40px] bg-slate-100 shadow-md">
          <div className="border_welcome_top absolute -right-16 top-9 h-56 w-52 bg-teal-500" />
          <div className="absolute top-[-70px] z-10 flex h-full w-full flex-col items-center">
            <Avatar image={image} setImage={setImage} />
            <Options
              name={name.value}
              setName={setName}
              error={name.error}
              image={image}
            />
          </div>
          <div className="border_welcome_bottom absolute -left-16 bottom-8 h-56 w-52 bg-teal-500" />
        </div>
      </div>
    </Wrapper>
  );
};
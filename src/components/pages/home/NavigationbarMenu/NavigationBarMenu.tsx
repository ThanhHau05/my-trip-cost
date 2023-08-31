import { useContext, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { Avatar } from '@/components/base';
import { HandleInfoUserOnAvatar } from '@/components/layout';
import { MainContext } from '@/context/main-context';
import { useClickOutSide } from '@/hooks';

import { ContainerNavigation } from './ContainerNavigation';

export const NavigationBarMenu = ({
  currentNumberOfNoti,
  name,
  image,
  id,
}: {
  currentNumberOfNoti: number;
  name: string;
  image: {
    url?: string;
    color?: string;
    text?: string;
  };
  id: number;
}) => {
  const { setShowCreateTheTrip } = useContext(MainContext);

  const [widthhover, setWidthHover] = useState(false);
  const [showuserinfo, setShowUserInfo] = useState(false);

  const showInfoUserRef = useClickOutSide(() => {
    setShowUserInfo(false);
  });
  return (
    <div
      ref={showInfoUserRef}
      className="fixed bottom-0 z-10 h-24 w-full border-t-2 border-t-purple-200 bg-purple-200 sm:w-[400px]"
    >
      <div className="absolute bottom-0 flex w-full items-center justify-around bg-white p-3 transition-all">
        <button
          onClick={() => setShowCreateTheTrip(true)}
          onMouseEnter={() => setWidthHover(true)}
          onMouseLeave={() => setWidthHover(false)}
          className="group absolute -top-8 h-16 w-16 select-none rounded-full border-8 border-purple-200 bg-white transition-all duration-200 hover:w-36"
        >
          <div className="absolute left-[-21px] top-[17px] h-5 w-5 rounded-full bg-purple-200 before:absolute before:left-[-5px] before:top-[7px] before:h-full before:w-full before:rounded-tr-[14px] before:bg-white before:content-[''] after:absolute after:left-1.5 after:top-[17px] after:h-[9px] after:w-2/4  after:rotate-[336deg] after:bg-white after:content-['']" />
          <div className="absolute right-[-21px] top-[17px] h-5 w-5 rounded-full bg-purple-200 before:absolute before:right-[-5px] before:top-[7px] before:h-full before:w-full before:rounded-tl-[14px] before:bg-white before:content-[''] after:absolute after:right-1.5 after:top-[17px] after:h-[9px] after:w-2/4  after:rotate-[23deg] after:bg-white after:content-['']" />
          <span className="invisible absolute text-sm font-medium group-hover:visible group-hover:static group-hover:delay-150">
            Create a new trip
          </span>
          <IoIosAdd className="mx-auto group-hover:absolute group-hover:hidden" />
        </button>
        <ContainerNavigation
          currentNumberOfNoti={currentNumberOfNoti}
          widthHover={widthhover}
        />
        <div className="cursor-pointer select-none">
          <Avatar
            cursorPointer
            size="36"
            img={{
              url: image.url || '',
              color: image.color || '',
              text: image.text || '',
            }}
            onClick={() => setShowUserInfo(!showuserinfo)}
          />
        </div>
        <HandleInfoUserOnAvatar show={showuserinfo} id={id} name={name} />
      </div>
    </div>
  );
};

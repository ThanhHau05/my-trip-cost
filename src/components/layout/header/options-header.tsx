import clsx from 'clsx';
import { useContext, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineContentCopy } from 'react-icons/md';

import { Avatar } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { useClickOutSide } from '@/hooks/useClickOutSide';

import { handleCopyInfo } from '../handle-layout';

export const ImageUser = ({
  image,
  id,
  name,
}: {
  image: {
    url?: string;
    color?: string;
    text?: string;
  };
  id: number;
  name: string;
}) => {
  const [showinfouser, setShowInfoUser] = useState(false);

  const showInfoUserRef = useClickOutSide(() => {
    setShowInfoUser(false);
  });

  return (
    <div ref={showInfoUserRef} className="relative">
      <div className="cursor-pointer rounded-full">
        <Avatar
          size="45"
          onClick={() => setShowInfoUser(!showinfouser)}
          img={{ url: image.url, color: image.color, text: image.text }}
          cursorPointer
        />
      </div>
      <HandleInfoUserOnAvatar show={showinfouser} id={id} name={name} />
    </div>
  );
};

export const HandleInfoUserOnAvatar = ({
  id,
  name,
  show,
}: {
  id: number;
  name: string;
  show: boolean;
}) => {
  const [checkcopyid, setCheckCopyID] = useState(false);
  const [checkcopyname, setCheckCopyName] = useState(false);

  return (
    <div
      className={clsx(
        'absolute bottom-[70px] right-3 z-20 flex select-none flex-col justify-center rounded-xl border-2 bg-white px-2 shadow-md transition-all duration-200',
        show ? 'visible h-[54px]' : 'invisible h-0',
      )}
    >
      <span
        className={clsx(
          'flex text-sm font-normal delay-75',
          show ? 'visible' : 'invisible',
        )}
      >
        Name:
        <span className="ml-1 flex items-center font-medium">
          {name}
          <div className="flex pl-2">
            {checkcopyname ? (
              <BsCheckCircleFill className="inline text-gray-600 drop-shadow-md" />
            ) : (
              <MdOutlineContentCopy
                className="inline cursor-pointer drop-shadow-md"
                onClick={() =>
                  handleCopyInfo(name.toString(), setCheckCopyName)
                }
              />
            )}
          </div>
        </span>
      </span>
      <span
        className={clsx(
          'flex text-sm font-normal delay-75',
          show ? 'visible' : 'invisible',
        )}
      >
        Id:
        <span className="ml-1 flex items-center font-medium">
          {id}
          <div className="flex pl-2">
            {checkcopyid ? (
              <BsCheckCircleFill className="inline text-gray-600 drop-shadow-md" />
            ) : (
              <MdOutlineContentCopy
                className="inline cursor-pointer drop-shadow-md"
                onClick={() => handleCopyInfo(id.toString(), setCheckCopyID)}
              />
            )}
          </div>
        </span>
      </span>
    </div>
  );
};

export const MenuBarsBox = () => {
  const { setShowVerticalMenu, showverticalmenu } = useContext(MainContext);

  const _handleOnClick = () => {
    setShowVerticalMenu(!showverticalmenu);
  };
  return (
    <button
      className="w-12 cursor-pointer outline-none"
      onClick={_handleOnClick}
    >
      <div
        className={clsx(
          'mb-[9px] transition-all',
          showverticalmenu ? '-translate-x-1' : null,
        )}
      >
        <div
          className={clsx(
            'transition-all',
            showverticalmenu ? 'translate-y-3' : null,
          )}
        >
          <div
            className={clsx(
              'ml-3 h-[3px] w-10 rounded-full bg-gray-900/90 transition-all',
              showverticalmenu ? 'w-9 rotate-45' : null,
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          'h-[3px] w-10 rounded-full bg-gray-900/90 transition-all duration-75',
          showverticalmenu ? 'invisible translate-x-2' : null,
        )}
      />
      <div
        className={clsx(
          'mt-[9px] transition-all',
          showverticalmenu ? '-translate-x-1' : null,
        )}
      >
        <div
          className={clsx(
            'transition-all',
            showverticalmenu ? '-translate-y-3' : null,
          )}
        >
          <div
            className={clsx(
              'ml-3 h-[3px] w-10 rounded-full bg-gray-900/90 transition-all',
              showverticalmenu ? 'w-9 -rotate-45' : null,
            )}
          />
        </div>
      </div>
    </button>
  );
};

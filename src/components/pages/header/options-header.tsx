import clsx from 'clsx';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineContentCopy } from 'react-icons/md';

import { useClickOutSide } from '@/hooks/useClickOutSide';

export const ImageUser = ({
  image,
  email,
  id,
}: {
  image: string;
  email?: string;
  id: number;
}) => {
  const [showinfouser, setShowInfoUser] = useState(false);

  const showInfoUserRef = useClickOutSide(() => {
    setShowInfoUser(false);
  });

  return (
    <div ref={showInfoUserRef} className="relative">
      <img
        onClick={() => setShowInfoUser(!showinfouser)}
        className="h-14 cursor-pointer rounded-full border-2 shadow-md outline-none transition-all hover:shadow-lg"
        src={image}
        alt=""
      />
      {showinfouser ? <HandleInfoUserOnAvatar email={email} id={id} /> : null}
    </div>
  );
};

const HandleInfoUserOnAvatar = ({
  email,
  id,
}: {
  email?: string;
  id: number;
}) => {
  const [checkcopyid, setCheckCopyID] = useState(false);
  const [checkcopygmail, setCheckCopyGmail] = useState(false);

  const _handleCopyInfo = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      if (value.includes('@')) {
        setCheckCopyGmail(true);
        const timer = setTimeout(() => {
          setCheckCopyGmail(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
      setCheckCopyID(true);
      const timer = setTimeout(() => {
        setCheckCopyID(false);
      }, 1500);
      return () => clearTimeout(timer);
    });
  };
  return (
    <div className="absolute right-0 z-10 mt-2 rounded-xl border-2 bg-white px-3 py-1 shadow-md">
      <span className="flex whitespace-nowrap text-sm font-normal">
        Email:
        {email ? (
          <span className="ml-1 flex items-center font-medium">
            nguyenhau@gmail.com
            <div className="flex pl-2">
              {checkcopygmail ? (
                <BsCheckCircleFill className="inline text-gray-600 drop-shadow-md" />
              ) : (
                <MdOutlineContentCopy
                  className="inline cursor-pointer drop-shadow-md"
                  onClick={() => _handleCopyInfo(email)}
                />
              )}
            </div>
          </span>
        ) : (
          <span className="ml-1 flex items-center font-medium">none</span>
        )}
      </span>
      <span className="flex text-sm font-normal">
        ID:
        <span className="ml-1 flex items-center font-medium">
          {id}
          <div className="flex pl-2">
            {checkcopyid ? (
              <BsCheckCircleFill className="inline text-gray-600 drop-shadow-md" />
            ) : (
              <MdOutlineContentCopy
                className="inline cursor-pointer drop-shadow-md"
                onClick={() => _handleCopyInfo(id.toString())}
              />
            )}
          </div>
        </span>
      </span>
    </div>
  );
};

export const MenuBarsBox = () => {
  const [onclick, setOnclick] = useState(false);
  const _handleOnClick = () => {
    setOnclick(!onclick);
  };
  return (
    <button
      className="flex w-12 cursor-pointer flex-col gap-2 outline-none"
      onClick={_handleOnClick}
    >
      <div
        className={clsx('transition-all', onclick ? '-translate-x-1' : null)}
      >
        <div
          className={clsx(
            'transition-all',
            onclick ? 'translate-y-[11px]' : null,
          )}
        >
          <div
            className={clsx(
              'ml-3 h-[3px] w-10 rounded-full bg-gray-900/90 transition-all',
              onclick ? 'w-9 rotate-45' : null,
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          'h-[3px] w-10 rounded-full bg-gray-900/90 transition-all duration-75',
          onclick ? 'invisible translate-x-2' : null,
        )}
      />
      <div
        className={clsx('transition-all', onclick ? '-translate-x-1' : null)}
      >
        <div
          className={clsx(
            'transition-all',
            onclick ? 'translate-y-[-11px]' : null,
          )}
        >
          <div
            className={clsx(
              'ml-3 h-[3px] w-10 rounded-full bg-gray-900/90 transition-all',
              onclick ? 'w-9 -rotate-45' : null,
            )}
          />
        </div>
      </div>
    </button>
  );
};

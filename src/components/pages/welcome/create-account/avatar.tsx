import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import { AiFillCamera } from 'react-icons/ai';

import { Avatar } from '@/components/base';

import { handleOpenFileChangeAvt } from '../handler';

export const AvatarCreateAccount = ({
  image,
  setImage,
}: {
  image: { color: string; text: string; url: string };
  setImage: Dispatch<
    SetStateAction<{
      url: string;
      color: string;
      text: string;
    }>
  >;
}) => {
  const uploadavtRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Avatar
        size="150"
        img={{ color: image.color, text: image.text, url: image.url }}
      />
      <div className="absolute bottom-px right-px cursor-pointer rounded-full border-2 bg-slate-100 p-1 shadow-md transition-all hover:bg-slate-200">
        <input
          type="file"
          className="hidden"
          ref={uploadavtRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => handleOpenFileChangeAvt(e, setImage, image)}
        />
        <AiFillCamera
          onClick={() => {
            if (uploadavtRef.current) {
              uploadavtRef.current.click();
            }
          }}
          className=" text-3xl text-gray-900"
        />
      </div>
    </div>
  );
};

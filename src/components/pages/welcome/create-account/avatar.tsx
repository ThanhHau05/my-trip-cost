import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import ReactAvatar from 'react-avatar';
import { AiFillCamera } from 'react-icons/ai';

export const Avatar = ({
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

  const handleOpenFileChangeAvt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setImage({ ...image, url: result });
        };
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <div className="relative">
      <ReactAvatar
        size="150"
        color={image.color}
        className="rounded-full shadow-md"
        value={image.text}
        src={image.url}
      />
      <div className="absolute bottom-px right-px cursor-pointer rounded-full border-2 bg-slate-100 p-1 shadow-md transition-all hover:bg-slate-200">
        <input
          type="file"
          className="hidden"
          ref={uploadavtRef}
          accept="image/*"
          onChange={handleOpenFileChangeAvt}
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

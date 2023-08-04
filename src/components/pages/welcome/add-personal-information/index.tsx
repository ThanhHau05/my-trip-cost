import type { Dispatch, SetStateAction } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import ReactAvatar from 'react-avatar';
import { AiFillCamera } from 'react-icons/ai';

import { Button, Input } from '@/components/base';
import { Wrapper } from '@/components/layout';
import { MainContext } from '@/context/main-context';
import { ImagesWelcomePage } from '@/public/images';

import { getRandomColor } from '../hook';

export const AddPersonalInformation = ({
  name,
  isCheckContinue,
  id,
}: {
  name: string;
  isCheckContinue: boolean;
  id: number;
}) => {
  const [image, setImage] = useState({
    url: '',
    color: '',
    text: '',
  });
  const [email, setEmail] = useState({ value: '', error: '' });

  useEffect(() => {
    const color = getRandomColor();
    setImage({ url: '', color, text: name.charAt(0).toUpperCase() });
  }, [isCheckContinue]);

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
              name={name}
              email={email}
              setEmail={setEmail}
              id={id}
              image={image}
            />
          </div>
          <div className="border_welcome_bottom absolute -left-16 bottom-8 h-56 w-52 bg-teal-500" />
        </div>
      </div>
    </Wrapper>
  );
};

const Options = ({
  name,
  email,
  setEmail,
  id,
  image,
}: {
  name: string;
  setEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  email: { value: string; error: string };
  id: number;
  image: {
    url: string;
    color: string;
    text: string;
  };
}) => {
  const { onSubmitStartNow } = useContext(MainContext);

  return (
    <>
      <div className="mt-9">
        <h2 className="block text-center text-2xl font-medium">
          Your name: <span className="font-bold">{name}</span>
        </h2>
        <h2 className="mt-2 block text-center text-2xl font-medium">
          Your id: <span className="font-bold">{id}</span>
        </h2>
      </div>
      <div className="mt-12 w-full px-5">
        <Input
          title="Email (optional)"
          otherType="email"
          onChangeText={(e) => setEmail({ value: e, error: '' })}
          value={email.value}
          error={email.error}
        />
        <p className="mt-2 text-xs">
          You can add to increase the search rate for your account quickly.
        </p>
      </div>
      <div className="mt-14 flex h-full w-full flex-col justify-end px-5">
        <div className="h-12 w-full">
          <Button
            onClick={() =>
              onSubmitStartNow(
                name,
                id,
                email,
                setEmail,
                image.url,
                image.color,
                image.text,
              )
            }
            title="START NOW"
          />
        </div>
      </div>
    </>
  );
};

const Avatar = ({
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

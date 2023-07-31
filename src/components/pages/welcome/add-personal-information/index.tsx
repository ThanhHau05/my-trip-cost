import { useContext } from 'react';
import Avatar from 'react-avatar';
import { AiFillCamera } from 'react-icons/ai';

import { Button, Input } from '@/components/base';
import { ImagesWelcomePage } from '@/components/images';
import { Wrapper } from '@/components/layout';
import { WelcomeContext } from '@/context/welcome-context';

export const AddPersonalInformation = () => {
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
            <_Avatar />
            <_Options />
          </div>
          <div className="border_welcome_bottom absolute -left-16 bottom-8 h-56 w-52 bg-teal-500" />
        </div>
      </div>
    </Wrapper>
  );
};

const _Options = () => {
  const { setEmail, email, name, onSubmitStartNow } =
    useContext(WelcomeContext);

  return (
    <>
      <div className="mt-9">
        <h2 className="block text-2xl font-medium">
          Your name: <span className="font-bold">{name.value}</span>
        </h2>
      </div>
      <div className="mt-14 w-full px-5">
        <Input title="Email (optional)" onChangeText={setEmail} value={email} />
      </div>
      <div className="mt-14 flex h-full w-full flex-col justify-end px-5">
        <div className="h-12 w-full">
          <Button onClick={onSubmitStartNow} title="START NOW" />
        </div>
      </div>
    </>
  );
};

const _Avatar = () => {
  const { image, uploadavtRef, handleOpenFileChangeAvt } =
    useContext(WelcomeContext);
  return (
    <div className="relative">
      <Avatar
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

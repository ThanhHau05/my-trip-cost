import { useState } from 'react';

import { Wrapper } from '@/components/layout';
import { ImagesWelcomePage } from '@/public/images';

import { SignIn } from '../sign-in';
import { OptionsContainerWelcome } from './options';

export const ContainerWelcome = ({
  setCheckCreateNow,
  setCheckLogin,
}: {
  setCheckCreateNow: (value: boolean) => void;
  setCheckLogin: (value: boolean) => void;
}) => {
  const [showsignin, setShowSignIn] = useState(false);

  return (
    <Wrapper>
      <div className="relative h-full bg-[#B0E2D6] shadow-md">
        <img
          className="absolute -top-9"
          src={ImagesWelcomePage.Background3.src}
          alt=""
        />

        <div className="fixed bottom-0 z-10 h-52 w-full sm:w-[400px]">
          <div className="relative h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="absolute -top-16 max-[640px]:top-[-98px] max-[450px]:-top-16 max-[280px]:mt-4"
            >
              <path
                className="fill-teal-400"
                fillOpacity="1"
                d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between bg-gradient-to-b from-teal-400 to-teal-300 px-5 min-[360px]:h-full">
              <OptionsContainerWelcome
                setShow={setShowSignIn}
                show={showsignin}
              />
              <SignIn
                setCheckCreateNow={setCheckCreateNow}
                setCheckLogin={setCheckLogin}
                show={showsignin}
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

import { Toaster } from 'react-hot-toast';
import { GrLinkPrevious } from 'react-icons/gr';

import { Wrapper } from '@/components/layout';

import { OptionsLoginByAccount } from './options';

export const LoginByAccount = ({
  setBackToMainPage,
}: {
  setBackToMainPage: (value: boolean) => void;
}) => {
  return (
    <Wrapper>
      <div className="h-full w-full">
        <Toaster />
        <div className="relative h-full w-full bg-slate-50">
          <GrLinkPrevious
            onClick={() => setBackToMainPage(false)}
            className="absolute left-0 top-0 ml-3 mt-3 cursor-pointer rounded-full border-2 bg-slate-50 p-1 text-3xl text-gray-900 hover:bg-slate-100"
          />
          <div className="border_welcome_top absolute right-0 top-9 h-56 w-40 bg-teal-500" />
          <div className="border_welcome_bottom absolute bottom-8 left-0 h-56 w-44 bg-teal-500" />
          <OptionsLoginByAccount />
        </div>
      </div>
    </Wrapper>
  );
};

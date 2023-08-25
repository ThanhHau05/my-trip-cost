/* eslint-disable jsx-a11y/alt-text */
import clsx from 'clsx';
import type { ReactNode } from 'react';

export const WrapperHeader = ({
  header,
  children,
  bgWhite,
}: {
  header: ReactNode;
  children: ReactNode;
  bgWhite?: boolean;
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-end bg-slate-500">
      <div className="relative flex w-full flex-1 flex-col justify-end sm:w-[400px]">
        <div className="absolute top-0 z-10 flex h-full w-full flex-col bg-white">
          <div className="relative h-full w-full  bg-purple-50 bg-gradient-to-tr shadow-xl">
            <div className="fixed -top-8 h-20 w-20 rounded-full bg-purple-100 " />
            <div className="fixed left-[44%] top-2.5 h-36 w-36 rounded-full bg-purple-100 " />
            <div className="absolute h-full w-full">
              <div className="h-20">{header}</div>
              <div
                className={clsx(
                  'h-[calc(100%-80px)] rounded-t-[40px]',
                  bgWhite ? 'bg-slate-50' : null,
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="flex h-screen flex-col items-center justify-end">
      <div className="relative flex w-full flex-1 flex-col justify-end sm:w-[400px]">
        <div className="absolute top-0 z-10 flex h-full w-full flex-col">
          <div className="h-full w-full bg-gradient-to-tr from-blue-700 to-cyan-500/80 shadow-xl">
            <div>{header}</div>
            <div
              className={clsx(
                'h-[calc(100%-80px)] rounded-t-[40px]',
                bgWhite ? 'bg-white' : null,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

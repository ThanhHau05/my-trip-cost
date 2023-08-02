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
    <div className="relative h-screen w-full bg-slate-200">
      <div className="absolute top-0 z-10 flex h-full w-full justify-center">
        <div className="h-full w-[400px] bg-gradient-to-tr from-blue-700 to-cyan-500/80 shadow-xl">
          {header}
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
  );
};

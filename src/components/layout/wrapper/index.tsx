import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto flex h-screen w-full flex-1 flex-col justify-end ">
      <div className="absolute top-0 z-10 flex h-full w-full">
        <div className="z-20 hidden w-full bg-slate-200 sm:block" />
        <div>
          <div className="h-full w-full sm:w-[400px]">{children}</div>
        </div>
        <div className="z-20 hidden w-full bg-slate-200 sm:block" />
      </div>
    </div>
  );
};

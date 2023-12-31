import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-end bg-slate-200">
      <div className="relative flex w-full flex-1 flex-col justify-end sm:w-[400px]">
        <div className="absolute top-0 z-10 flex h-full w-full flex-col">
          <div className="h-full w-full">
            <div className="h-full w-full sm:w-[400px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

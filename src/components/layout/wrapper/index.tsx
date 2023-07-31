import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 z-10 flex h-full w-full justify-center">
        <div className="z-20 w-full bg-slate-200" />
        <div>
          <div className="h-full w-[400px] bg-white">{children}</div>
        </div>
        <div className="z-20 w-full bg-slate-200" />
      </div>
    </div>
  );
};

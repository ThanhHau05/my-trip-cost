import type { ReactNode } from 'react';

export const VerticalMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed z-40 h-[calc(100%-80px)] w-full rounded-t-[40px] bg-gray-800/50 px-1 pt-1 sm:w-[400px]">
      <div className=" inline-block h-full rounded-t-[36px] bg-gray-300 px-3 pt-5">
        {children}
      </div>
    </div>
  );
};

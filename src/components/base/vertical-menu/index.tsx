import type { ReactNode } from 'react';

export const VerticalMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed z-40 h-[calc(100%-80px)] w-[400px] rounded-t-[40px] bg-gray-900/50">
      <div className="ml-1 mt-1 h-full w-52 rounded-t-[36px] bg-gray-300 px-5 pt-5">
        {children}
      </div>
    </div>
  );
};

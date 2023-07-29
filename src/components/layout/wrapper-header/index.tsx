import type { ReactNode } from 'react';

export const WrapperHeader = ({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="relative h-screen w-full bg-slate-200">
      <div className="absolute top-0 z-10 flex h-full w-full justify-center">
        <div className="h-full w-[400px] bg-gradient-to-tr from-blue-700 to-cyan-500/80 shadow-xl">
          {header}
          <div className="mt-2 h-full rounded-t-[40px] border-gray-500 bg-white shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

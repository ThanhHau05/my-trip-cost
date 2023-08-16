import clsx from 'clsx';
import type { ReactNode } from 'react';
import { BsCaretDown } from 'react-icons/bs';

export const RenderShowInfo = ({
  children,
  show,
  setShow,
  title,
}: {
  children: ReactNode;
  show: boolean;
  setShow: (value: boolean) => void;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <h2
          className="inline-block cursor-pointer select-none font-medium hover:underline hover:underline-offset-2"
          onClick={() => setShow(!show)}
        >
          {title}
        </h2>
        <div className="ml-1 mt-1 inline-block text-lg font-medium">
          <BsCaretDown
            className={clsx(
              'inline-block transition-all duration-100',
              show ? 'rotate-180' : null,
            )}
          />
        </div>
      </div>
      {show ? children : null}
    </div>
  );
};

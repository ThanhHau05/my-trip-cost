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
    <div>
      <div
        className="group mb-2 inline-block cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h2 className="inline-block select-none font-medium group-hover:underline group-hover:underline-offset-2">
          {title}
        </h2>
        <div className="ml-1 inline-block text-lg font-medium">
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

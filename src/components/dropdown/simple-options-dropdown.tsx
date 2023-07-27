import clsx from 'clsx';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { useClickOutSide } from '@/hooks/useClickOutSide';

export const SimpleDropDown = ({
  option,
  onClick,
  title,
  image,
  disabled,
}: {
  option: SelectOptionsRenderDropDown[];
  onClick: (value: string, image?: string) => void;
  title: string;
  image?: string;
  disabled?: boolean;
}) => {
  const [iconpointdown, setIconPointDown] = useState(false);

  const _handleShowDropDown = () => {
    setIconPointDown(!iconpointdown);
  };

  const dropdownRef = useClickOutSide(() => {
    setIconPointDown(false);
  });

  const _handleOnSubmit = (value: string, img?: string) => {
    onClick(value, img);
    _handleShowDropDown();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        disabled={disabled}
        onClick={_handleShowDropDown}
        className="relative h-14 w-full cursor-pointer rounded-xl border-2 border-gray-400 shadow-md drop-shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:hover:shadow-md"
      >
        <div className="flex items-center justify-center">
          {image ? (
            <img
              className="ml-3 h-12 w-12 rounded-full border-2 border-slate-100"
              src={image}
              alt=""
            />
          ) : null}
          <span
            className={clsx(
              'block w-full pr-10 text-left font-medium',
              image ? 'pl-2' : 'pl-5',
            )}
          >
            {title}
          </span>
        </div>
        <div className="absolute right-0 top-0 flex h-full items-center justify-center pr-2">
          <BiChevronDown
            className={clsx(
              'text-3xl text-gray-900 transition-all',
              iconpointdown ? 'rotate-180' : 'rotate-0',
            )}
          />
        </div>
      </button>
      {iconpointdown ? (
        <ContainerOptionsRenderDropDown
          option={option}
          onClick={_handleOnSubmit}
        />
      ) : null}
    </div>
  );
};

const ContainerOptionsRenderDropDown = ({
  option,
  onClick,
}: {
  option: SelectOptionsRenderDropDown[];
  onClick: (value: string, image?: string) => void;
}) => {
  return (
    <div className="dropdown absolute z-10 mt-3 max-h-44 w-full overflow-auto rounded-lg border-2 border-gray-200 bg-white p-1 shadow-md drop-shadow-md transition-all hover:shadow-lg">
      {option.map((item) => (
        <OptionsRenderDropdown
          key={item.title}
          image={item.image}
          title={item.title}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

const OptionsRenderDropdown = ({
  image,
  title,
  onClick,
}: {
  image?: string;
  title: string;
  onClick: (value: string, image?: string) => void;
}) => {
  return (
    <button
      onClick={() => onClick(title, image)}
      className="group flex w-full cursor-pointer items-center justify-center rounded-md px-2 py-1 text-left transition-all duration-75 hover:bg-slate-200 hover:font-medium hover:drop-shadow-md"
    >
      {image ? (
        <img
          className="h-12 w-12 rounded-full border-2 border-slate-100 transition-all duration-75 group-hover:border-slate-300 group-hover:shadow-md"
          src={image}
          alt=""
        />
      ) : null}
      <span className="block w-full pl-2 ">{title}</span>
    </button>
  );
};

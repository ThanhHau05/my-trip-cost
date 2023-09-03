import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BiChevronDown, BiLoaderAlt } from 'react-icons/bi';
import { GoPersonAdd } from 'react-icons/go';

import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { useClickOutSide } from '@/hooks/useClickOutSide';

import { Avatar } from '../avatar';

export const Dropdown = ({
  option,
  onClick,
  defaultTitle,
  disabled,
  defaultImage,
}: {
  option: SelectOptionsRenderDropDown[];
  onClick: (
    value: string,
    image?: {
      url?: string;
      color?: string;
      text?: string;
    },
  ) => void;
  defaultTitle?: string;
  disabled?: boolean;
  defaultImage?: {
    url?: string;
    color?: string;
    text?: string;
  };
}) => {
  const [iconpointdown, setIconPointDown] = useState(false);
  const [valuetitle, setValueTitle] = useState('');
  const [valueimage, setValueImage] = useState({
    url: '',
    color: '',
    text: '',
  });

  const _handleShowDropDown = () => {
    setIconPointDown(!iconpointdown);
  };

  const dropdownRef = useClickOutSide(() => {
    setIconPointDown(false);
  });

  const _handleOnSubmit = (
    valueTitle: string,
    value: string,
    img?: {
      url?: string;
      color?: string;
      text?: string;
    },
  ) => {
    if (defaultTitle) {
      setValueTitle(valueTitle);
    }
    if (defaultImage) {
      setValueImage({
        url: img?.url || '',
        color: img?.color || '',
        text: img?.text || '',
      });
    }
    onClick(value, img);
    _handleShowDropDown();
  };

  useEffect(() => {
    if (defaultTitle) {
      const value = option.find((item) => item.value === defaultTitle);
      if (value) {
        setValueTitle(value?.title);
        if (defaultImage) {
          setValueImage({
            url: value.image?.url || '',
            color: value.image?.color || '',
            text: value.image?.text || '',
          });
        }
      }
    }
  }, [defaultTitle]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        disabled={disabled}
        onClick={_handleShowDropDown}
        className={clsx(
          'relative h-12 w-full cursor-pointer rounded-xl bg-white shadow-md transition-all disabled:cursor-not-allowed',
          iconpointdown ? 'border-blue-600' : null,
          defaultImage ? 'h-14' : null,
        )}
      >
        <div className="flex items-center justify-center">
          {defaultImage ? (
            <div className="ml-3">
              <Avatar
                img={{
                  url: valueimage?.url,
                  color: valueimage?.color,
                  text: valueimage?.text,
                }}
              />
            </div>
          ) : null}
          <span
            className={clsx(
              'block w-full pr-10 text-left font-medium drop-shadow-md',
              defaultImage ? 'pl-2' : 'pl-5',
            )}
          >
            {valuetitle}
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
  onClick: (
    title: string,
    value: string,
    image?: {
      url?: string;
      color?: string;
      text?: string;
    },
  ) => void;
}) => {
  return (
    <div className="scrollbarstyle absolute z-30 mt-3 max-h-44 w-full overflow-auto rounded-lg border-2 border-gray-200 bg-white p-1 shadow-md drop-shadow-md transition-all hover:shadow-lg">
      {option.length !== 0 ? (
        option.map((item) => (
          <OptionsRenderDropdown
            key={item.title}
            image={item.image}
            title={item.title}
            onClick={onClick}
            value={item.value}
          />
        ))
      ) : (
        <div className="flex items-center justify-center py-3">
          <BiLoaderAlt className="animate-spin text-3xl" />
        </div>
      )}
    </div>
  );
};

const OptionsRenderDropdown = ({
  image,
  title,
  onClick,
  value,
}: {
  image?: {
    url?: string;
    color?: string;
    text?: string;
  };
  title: string;
  onClick: (
    title: string,
    value: string,
    image?: {
      url?: string;
      color?: string;
      text?: string;
    },
  ) => void;
  value: string;
}) => {
  return (
    <button
      onClick={() => onClick(title, value, image)}
      className="group flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 text-left transition-all duration-75 hover:bg-slate-200 hover:font-medium hover:drop-shadow-md"
    >
      <div className="flex items-center justify-center">
        {image ? (
          <div>
            <Avatar
              img={{ url: image.url, color: image.color, text: image.text }}
            />
          </div>
        ) : null}
        <span className="block w-full pl-2 ">{title}</span>
      </div>
      {image ? (
        <GoPersonAdd className="hidden text-xl font-medium group-hover:block" />
      ) : null}
    </button>
  );
};

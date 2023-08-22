import clsx from 'clsx';
import React from 'react';
import type { IconType } from 'react-icons/lib';

export const Button = ({
  title,
  onClick,
  disabled,
  bgWhite,
  icon,
  textSmall,
  height,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  bgWhite?: boolean;
  icon?: IconType;
  textSmall?: boolean;
  height?: number;
}) => {
  return (
    <ContainerButton
      title={title}
      onClick={onClick}
      disabled={disabled}
      bgWhite={bgWhite}
      Icon={icon}
      textSmall={textSmall}
      height={height}
    />
  );
};

export const ContainerButton = ({
  title,
  onClick,
  disabled,
  bgWhite,
  Icon,
  textSmall,
  height,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  bgWhite?: boolean;
  Icon?: IconType;
  textSmall?: boolean;
  height?: number;
}) => {
  return (
    <button
      style={{ height: `${height}rem` }}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex h-full w-full items-center rounded-full font-bold shadow-md drop-shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:shadow-md',
        bgWhite ? 'bg-white text-gray-900' : 'bg-blue-600 text-white',
        Icon ? 'justify-start' : ' justify-center',
        textSmall ? 'text-xs' : 'text-sm',
      )}
    >
      {Icon ? <Icon className="ml-20 mr-5 inline-block text-3xl" /> : null}
      {title}
    </button>
  );
};

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import type { IconType } from 'react-icons/lib';

export const Button = ({
  title,
  onClick,
  disabled,
  to,
  bgWhite,
  icon,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  bgWhite?: boolean;
  icon?: IconType;
}) => {
  return to ? (
    <Link href={to}>
      <ContainerButton
        title={title}
        onClick={onClick}
        disabled={disabled}
        bgWhite={bgWhite}
        Icon={icon}
      />
    </Link>
  ) : (
    <ContainerButton
      title={title}
      onClick={onClick}
      disabled={disabled}
      bgWhite={bgWhite}
      Icon={icon}
    />
  );
};

export const ContainerButton = ({
  title,
  onClick,
  disabled,
  bgWhite,
  Icon,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  bgWhite?: boolean;
  Icon?: IconType;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex h-full w-full items-center rounded-full text-sm font-bold shadow-md drop-shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:shadow-md',
        bgWhite ? 'bg-white text-gray-900' : 'bg-blue-600 text-white',
        Icon ? 'justify-start' : ' justify-center',
      )}
    >
      {Icon ? <Icon className="ml-20 mr-5 inline-block text-3xl" /> : null}
      {title}
    </button>
  );
};

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const Button = ({
  title,
  onClick,
  disabled,
  to,
  bgWhite,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  bgWhite?: boolean;
}) => {
  return to ? (
    <Link href={to}>
      <ContainerButton
        title={title}
        onClick={onClick}
        disabled={disabled}
        bgWhite={bgWhite}
      />
    </Link>
  ) : (
    <ContainerButton
      title={title}
      onClick={onClick}
      disabled={disabled}
      bgWhite={bgWhite}
    />
  );
};

export const ContainerButton = ({
  title,
  onClick,
  disabled,
  bgWhite,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  bgWhite?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'h-full w-full rounded-full text-sm font-bold shadow-md drop-shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:shadow-md',
        bgWhite ? 'bg-white text-gray-900' : 'bg-blue-600 text-white',
      )}
    >
      {title}
    </button>
  );
};

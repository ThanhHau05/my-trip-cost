import Link from 'next/link';
import React from 'react';

export const Button = ({
  title,
  onClick,
  disabled,
  to,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
}) => {
  return to ? (
    <Link href={to}>
      <ContainerButton title={title} onClick={onClick} disabled={disabled} />
    </Link>
  ) : (
    <ContainerButton title={title} onClick={onClick} disabled={disabled} />
  );
};

export const ContainerButton = ({
  title,
  onClick,
  disabled,
}: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="h-full w-full rounded-full border-2 border-gray-300 bg-blue-600 text-sm font-medium text-white shadow-md drop-shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:shadow-md"
    >
      {title}
    </button>
  );
};

import Link from 'next/link';

export const SimpleButton = ({
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
      <Button title={title} onClick={onClick} disabled={disabled} />
    </Link>
  ) : (
    <Button title={title} onClick={onClick} disabled={disabled} />
  );
};

const Button = ({
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
      className="h-full w-full rounded-full border-2 border-gray-300 bg-blue-600 text-sm font-medium text-white shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:shadow-md"
    >
      {title}
    </button>
  );
};

import clsx from 'clsx';
import ReactAvatar from 'react-avatar';

export const Avatar = ({
  img,
  onClick,
  cursorPointer,
  size,
}: {
  img: {
    url?: string;
    color?: string;
    text?: string;
  };
  onClick?: () => void;
  cursorPointer?: boolean;
  size?: string;
}) => {
  return img?.url || img?.color || img?.text ? (
    <ReactAvatar
      onClick={onClick}
      src={img?.url || ''}
      size={size || '48'}
      value={img?.text || ''}
      color={img?.color || ''}
      round
    />
  ) : (
    <div
      className={clsx(
        'skeleton z-20 h-11 w-11 select-none rounded-full border-2 border-slate-100 bg-gray-400 shadow-md',
        cursorPointer ? 'cursor-pointer' : null,
      )}
    />
  );
};

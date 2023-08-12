import clsx from 'clsx';
import ReactAvatar from 'react-avatar';

import { Images } from '../image';

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
  return img && (img.url || img.color || img.text) ? (
    <ReactAvatar
      onClick={onClick}
      src={img.url ? img.url : ''}
      size={size || '48'}
      value={img.text ? img.text : ''}
      color={img.color ? img.color : ''}
      round
    />
  ) : (
    <div className="flex h-12 w-12 select-none items-center justify-center rounded-full border-2 border-slate-100 bg-gray-400 shadow-md">
      <ReactAvatar
        src={Images.User.src}
        size="44"
        round
        className={clsx(cursorPointer ? 'cursor-pointer' : null)}
      />
    </div>
  );
};

import clsx from 'clsx';

import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

export const RenderUserAvt = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item, index) => {
        const left = `${-15 * index}px`;
        return (
          <div
            style={index !== 0 ? { left } : undefined}
            key={item.uid}
            className={clsx(
              'inline-block py-2 pb-3',
              index !== 0 ? 'relative drop-shadow-md' : null,
            )}
          >
            <Avatar
              img={{
                color: item.photoURL.color,
                text: item.photoURL.text,
                url: item.photoURL.url,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

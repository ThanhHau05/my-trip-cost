import clsx from 'clsx';

import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

export const RenderAvt = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item, index) => {
        if (data.length >= 7 && index > 5) {
          if (index < 7) {
            return (
              <div
                key={item.uid}
                className={clsx(
                  'relative inline-block py-2 pb-3 drop-shadow-md',
                )}
                style={{ left: `${-15 * index}px` }}
              >
                <Avatar
                  img={{
                    color: '#ababab',
                    text: `+${data.length - 1}`,
                    url: '',
                  }}
                  size="40"
                />
              </div>
            );
          }
          return null;
        }

        return (
          <div
            key={item.uid}
            className={clsx(
              'inline-block py-2 pb-3',
              index !== 0 && 'relative drop-shadow-md',
            )}
            style={index !== 0 ? { left: `${-15 * index}px` } : undefined}
          >
            <Avatar
              img={{
                color: item.photoURL.color,
                text: item.photoURL.text,
                url: item.photoURL.url,
              }}
              size="40"
            />
          </div>
        );
      })}
    </>
  );
};

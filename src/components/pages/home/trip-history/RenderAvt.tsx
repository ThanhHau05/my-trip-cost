import clsx from 'clsx';

import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

export const RenderAvt = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item, index) => {
        if (data.length >= 4 && index > 2) {
          if (index < 4) {
            return (
              <h2
                key={item.uid}
                className={clsx(
                  'relative inline-block text-sm font-medium text-gray-700 drop-shadow-md',
                )}
                style={{ left: `${-10 * index}px` }}
              >
                +{data.length - 3} more
              </h2>
            );
          }
          return null;
        }

        return (
          <div
            key={item.uid}
            className={clsx('inline-block', index !== 0 && 'relative')}
            style={index !== 0 ? { left: `${-15 * index}px` } : undefined}
          >
            <div className="rounded-full border-4 border-slate-50">
              <Avatar
                img={{
                  color: item.photoURL.color,
                  text: item.photoURL.text,
                  url: item.photoURL.url,
                }}
                size="38"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

import clsx from 'clsx';
import { useEffect } from 'react';

import { Avatar } from '@/components/base';
import type {
  SelectOptionsInvoice,
  SelectOptionsRenderDropDown,
} from '@/constants/select-options';

export const RenderUserAddInvoice = ({
  data,
  invoicelist,
  userUid,
  setUserUid,
  setSelectedUserClick,
}: {
  data: SelectOptionsRenderDropDown[];
  invoicelist: SelectOptionsInvoice[];
  userUid: string;
  setUserUid: (value: string) => void;
  setSelectedUserClick: (value: SelectOptionsInvoice[]) => void;
}) => {
  useEffect(() => {
    if (data.length !== 0 && invoicelist.length === 0) {
      setUserUid(data[0]?.value || '');
      const value: SelectOptionsInvoice = {
        uid: data[0]?.value || '',
        payerName: '',
        payerImage: {
          color: '',
          text: '',
          url: '',
        },
        activity: 'shopping',
        qty: 1,
        money: 0,
        moneySuggest: 0,
        time: '',
      };
      setSelectedUserClick([value]);
    }
  }, [data, invoicelist]);

  return (
    <div>
      <div className="dropdown w-full overflow-x-auto py-3 pt-9">
        <div className="flex items-center justify-start gap-2 px-3">
          {data &&
            data.map((item) => (
              <div
                key={item.value}
                className="relative z-20 inline-block drop-shadow-md"
              >
                <div
                  className={clsx(
                    'group relative inline-block rounded-xl',
                    item.value === userUid ? ' bg-slate-200 p-1' : null,
                  )}
                >
                  <span className="absolute -top-7 z-30 ml-0 hidden rounded-2xl border bg-white px-2 py-0.5 text-xs font-medium group-hover:block">
                    {item.title}
                  </span>
                  <Avatar
                    cursorPointer
                    img={{
                      url:
                        item.image?.url || ''
                          ? item.image?.url || ''
                          : item.image?.text || '',
                      color: item.image?.url ? '' : item.image?.color,
                      text: item.image?.url ? '' : item.title[0]?.toUpperCase(),
                    }}
                    onClick={() => setUserUid(item.value)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

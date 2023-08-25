import clsx from 'clsx';
import { useContext } from 'react';

import { NAVIGATION_BAR_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { handleOnSubmitNavagitionBar } from '../handler';

export const ContainerNavigation = ({
  widthHover,
  currentNumberOfNoti,
}: {
  currentNumberOfNoti: number;
  widthHover: boolean;
}) => {
  const {
    sliderRef,
    setValueCheckPage,
    valuecheckpage,
    setShowTripHistory,
    showtriphistory,
  } = useContext(MainContext);
  return (
    <>
      {NAVIGATION_BAR_MENU.map((item) =>
        item.value === 'space' ? (
          <div
            key={item.value}
            className={clsx(widthHover ? 'w-1/3' : 'w-1/5', 'transition-all')}
          />
        ) : (
          <div
            key={item.value}
            className="group flex cursor-pointer flex-col items-center justify-center drop-shadow transition-all"
            onClick={() => {
              setValueCheckPage(item.value.toString());
              handleOnSubmitNavagitionBar({
                value: item.value.toString(),
                sliderRef,
                setShowTripHistory,
                showtriphistory,
              });
            }}
          >
            {item.icon && (
              <div className="relative">
                {currentNumberOfNoti && item.value === 'invitation' ? (
                  <span
                    className={clsx(
                      'absolute -top-1 z-10 rounded-full bg-red-500 px-1 text-[10px]',
                      currentNumberOfNoti >= 10 ? '-right-1.5' : 'right-[-5px]',
                    )}
                  >
                    {currentNumberOfNoti >= 10 ? '9+' : currentNumberOfNoti}
                  </span>
                ) : null}
                {valuecheckpage === item.value && item.atIcon ? (
                  <item.atIcon className="text-xl text-gray-700 transition-all group-hover:text-gray-800" />
                ) : (
                  <item.icon
                    className={clsx(
                      'text-xl text-gray-700 transition-all group-hover:text-gray-800',
                      valuecheckpage === item.value && !item.atIcon
                        ? 'text-gray-900'
                        : null,
                    )}
                  />
                )}
              </div>
            )}
            <h2
              className={clsx(
                'select-none text-xs text-gray-700 transition-all group-hover:text-gray-800',
                valuecheckpage === item.value ? 'text-gray-900' : null,
              )}
            >
              {item.title}
            </h2>
          </div>
        ),
      )}
    </>
  );
};

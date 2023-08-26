import type { SelectOptionsInvoice } from '@/constants/select-options';

import { BtnAddInvoice } from './BtnAddInvoice';
import { RenderInvoice } from './RenderInvoice';

export const RenderInvoiceHistory = ({
  starttime,
  valueInvoice,
}: {
  starttime: string;
  valueInvoice: SelectOptionsInvoice[];
}) => {
  return (
    <div className="relative h-full w-full rounded-t-[40px] pr-1 pt-5 shadow">
      <div className="border_welcome_top absolute bottom-14 right-0 h-56 w-40 bg-teal-500" />
      <div className="relative z-10 h-full w-full">
        <div className="border_welcome_bottom_status_trip absolute left-0 top-4 z-0 h-56 w-40 bg-teal-500" />
        <div className="scrollbarstyle flex h-[calc(100%-73px)] w-full flex-col overflow-auto pb-5 pl-3 pr-2">
          <div className="z-10 flex items-center">
            <div className="ml-6 mr-3 inline-block h-3 w-3 rounded-full bg-gray-800" />
            <div className="flex flex-col">
              <span className="text-lg">Start the trip</span>
              <span>{starttime}</span>
            </div>
          </div>
          <RenderInvoice showClose data={valueInvoice} />
        </div>
        <BtnAddInvoice />
      </div>
    </div>
  );
};

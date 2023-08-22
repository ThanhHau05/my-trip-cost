import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { MainContext } from '@/context/main-context';

import { OptionsAddInvoice } from './options';

export const AddInvoice = ({ show }: { show: boolean }) => {
  const { setShowAddInvoice } = useContext(MainContext);

  return show ? (
    <div className="fixed z-30 h-[calc(100%-80px)] w-full rounded-t-[40px] bg-gray-800/50 px-1 pt-1 sm:w-[400px]">
      <div className="h-full w-full rounded-t-[40px] bg-slate-50">
        <GrClose
          className="absolute right-1 top-6 ml-auto mr-4 cursor-pointer"
          onClick={() => setShowAddInvoice(false)}
        />
        <OptionsAddInvoice />
      </div>
    </div>
  ) : null;
};

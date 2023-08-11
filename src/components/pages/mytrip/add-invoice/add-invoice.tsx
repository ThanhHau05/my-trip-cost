import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { MainContext } from '@/context/main-context';

import { OptionsAddInvoice } from './options';

export const AddInvoice = ({
  setUidAndMoney,
}: {
  setUidAndMoney: (uid: string, money: number) => void;
}) => {
  const { setShowAddInvoice } = useContext(MainContext);

  return (
    <div className="fixed z-30 h-[calc(100%-80px)] w-400 rounded-t-[40px] bg-gray-800/50 px-1 pt-1">
      <div className="h-full w-full rounded-t-[40px] bg-slate-50 pt-5">
        <GrClose
          className="mb-2 ml-auto mr-4 cursor-pointer"
          onClick={() => setShowAddInvoice(false)}
        />
        <OptionsAddInvoice setUidAndMoney={setUidAndMoney} />
      </div>
    </div>
  );
};

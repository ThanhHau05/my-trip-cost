import { useContext } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { MainContext } from '@/context/main-context';

export const BtnAddInvoice = () => {
  const { setShowAddInvoice } = useContext(MainContext);
  return (
    <button
      onClick={() => setShowAddInvoice(true)}
      className="group relative mx-auto mt-2 flex h-12 w-12 select-none items-center justify-center rounded-full bg-blue-600 outline-none drop-shadow-md transition-all hover:w-40 hover:shadow-xl"
    >
      <IoIosAdd className="flex h-8 w-8 items-center justify-center text-sm font-bold text-white group-hover:invisible" />
      <h2 className="invisible absolute text-sm font-bold text-white group-hover:visible group-hover:delay-150">
        Add Invoice
      </h2>
    </button>
  );
};

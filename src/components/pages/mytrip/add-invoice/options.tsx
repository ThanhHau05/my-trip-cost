import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { selector } from '@/redux';

import { handleGetPayerList } from '../handler';
import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);

  useEffect(() => {
    handleGetPayerList({ id: currentIdJoinTrip, setPayerList });
  }, [currentIdJoinTrip]);

  return (
    <div className="h-full">
      <RenderUserAddInvoice data={payerlist} />
      <OptionsUser />
    </div>
  );
};

import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { MyTripContext } from '@/context/mytrip-context';
import { selector } from '@/redux';

import { handleGetPayerList, onSubmitAddInvoice } from '../handler';
import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { onSaveUserInfoToData, setSelectedPayerList } =
    useContext(MyTripContext);

  const { setShowAddInvoice } = useContext(MainContext);

  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);

  useEffect(() => {
    handleGetPayerList({ id: currentIdJoinTrip, setPayerList });
  }, [currentIdJoinTrip]);

  return (
    <div className="relative h-full">
      <RenderUserAddInvoice data={payerlist} />
      <OptionsUser />
      <div className="absolute bottom-0 mb-3 h-12 w-full px-3">
        <Button
          title="Add"
          onClick={() =>
            onSubmitAddInvoice({
              id: currentIdJoinTrip,
              onSaveUserInfoToData,
              setSelectedPayerList,
              setShowAddInvoice,
            })
          }
          height={3}
        />
      </div>
    </div>
  );
};

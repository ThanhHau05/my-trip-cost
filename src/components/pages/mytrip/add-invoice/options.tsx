import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Dropdown } from '@/components/base';
import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { MyTripContext } from '@/context/mytrip-context';
import { selector } from '@/redux';

import { handleGetPayerList, onSubmitAddInvoice } from '../handler';
import { OptionsUser } from './options-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const {
    setSelectedPayerList,
    setUserUidPayer,
    onSaveUserInfoToData,
    setUserUidClick,
  } = useContext(MyTripContext);

  const { setShowAddInvoice } = useContext(MainContext);

  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);
  const [userpayer, setUserPayer] = useState({
    value: '',
    img: {
      color: '',
      text: '',
      url: '',
    },
  });
  const [newpayerlist, setNewPayerList] = useState<
    SelectOptionsRenderDropDown[]
  >([]);

  useEffect(() => {
    handleGetPayerList({ id: currentIdJoinTrip, setPayerList });
  }, [currentIdJoinTrip]);

  useEffect(() => {
    if (userpayer.value) {
      setUserUidPayer(userpayer.value);
    }
  }, [userpayer]);

  useEffect(() => {
    if (newpayerlist) {
      setUserPayer({
        img: {
          color: newpayerlist[0]?.image?.color || '',
          text: newpayerlist[0]?.image?.text || '',
          url: newpayerlist[0]?.image?.url || '',
        },
        value: newpayerlist[0]?.value || '',
      });
    }
  }, [newpayerlist]);

  useEffect(() => {
    if (payerlist) {
      const newPayerList = payerlist
        .map((item) => {
          if (item.status) return item;
          return undefined;
        })
        .filter((item) => item !== undefined) as SelectOptionsRenderDropDown[];
      setNewPayerList(newPayerList);
    }
  }, [payerlist]);

  return (
    <div className="relative h-full">
      {/* <RenderUserAddInvoice data={payerlist} /> */}
      <div className="px-3 pt-10">
        <h2 className="pb-3 font-medium drop-shadow-md">Payer</h2>
        <Dropdown
          option={newpayerlist}
          onClick={(e, i) => {
            setUserUidClick(newpayerlist[0]?.value || '');
            onSaveUserInfoToData();
            setUserPayer({
              value: e,
              img: {
                color: i?.color || '',
                text: i?.text || '',
                url: i?.url || '',
              },
            });
          }}
          defaultImage={userpayer.img}
          defaultTitle={userpayer.value}
        />
      </div>
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

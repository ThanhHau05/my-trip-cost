/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { Button, Dropdown, Input } from '@/components/base';
import type { SelectOptionsInvoice } from '@/constants/select-options';
import { ACTIVITES } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { MyTripContext } from '@/context/mytrip-context';
import { DataFirebase } from '@/firebase';
import { useGetTimeAndDate, useRandomIdInvoice } from '@/hooks';
import { selector } from '@/redux';

import { Quantity } from './quantity';
import { RenderSuggest } from './render-suggest';

export const OptionsUser = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const {
    activity,
    setActivity,
    setOthers,
    others,
    quantity,
    setQuantity,
    moneysuggest,
    valueMoney,
    valueMoneyText,
    money,
    handleChangeMoney,
    setMoneySuggest,
    setDeleteMoney,
    onSaveUserInfoToData,
    setSelectedPayerList,
  } = useContext(MyTripContext);

  const { setShowAddInvoice } = useContext(MainContext);

  const onSubmitAddInvoice = async () => {
    const dataInvoice: SelectOptionsInvoice[] = [];
    const value = onSaveUserInfoToData(true);
    const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
    if (value) {
      if (trip) {
        const { userlist } = trip;
        const newuserlist = userlist.map((item1) => {
          const valueFind = value?.find((item2) => item2.uid === item1.uid);
          if (valueFind) {
            return {
              ...item1,
              totalmoney:
                (item1.totalmoney || 0) +
                (valueFind.money + valueFind.moneySuggest) * valueFind.qty,
            };
          }
          return item1;
        });
        await DataFirebase.useAddTotalForUser(currentIdJoinTrip, newuserlist);
      }
    }
    if (value && value.length !== 0) {
      const promises = value.map(async (item) => {
        const userinfo = await DataFirebase.useGetUserInfoInTrip(
          item.uid,
          currentIdJoinTrip,
        );
        const { moneySuggest, qty, uid, other } = item;
        const id = useRandomIdInvoice();
        const data: SelectOptionsInvoice = {
          activity: item.activity,
          money: item.money,
          moneySuggest,
          payerImage: {
            url: userinfo?.photoURL.url || '',
            color: userinfo?.photoURL.color || '',
            text: userinfo?.photoURL.text || '',
          },
          payerName: userinfo?.displayName || '',
          time: useGetTimeAndDate(),
          qty,
          uid,
          other,
          id,
        };
        dataInvoice.push(data);
      });
      await Promise.all(promises).then(async () => {
        await DataFirebase.useUpdateInvoiceIntoTripData(
          currentIdJoinTrip,
          dataInvoice,
        );
        setSelectedPayerList([]);
      });
      setShowAddInvoice(false);
    }
  };

  return (
    <div className="h-5/6 px-3">
      <Toaster />
      <div className="dropdown mb-5 mt-3 flex h-full flex-col items-center justify-between overflow-auto pr-1">
        <div>
          <div className="mt-2">
            <h2 className="mb-2 font-medium">Activities</h2>
            <Dropdown
              defaultTitle={activity}
              option={ACTIVITES}
              onClick={setActivity}
              title
            />
            {activity === 'others' ? (
              <Input
                onChangeText={(e) => setOthers({ value: e, error: '' })}
                value={others.value}
                error={others.error}
                placeholder="Enter activity"
              />
            ) : null}
            <div className="mt-3">
              <Quantity onChange={setQuantity} valueQuantity={quantity} />
            </div>
          </div>
          <div className="mt-2">
            <Input
              title="Money"
              onChangeText={(e) => handleChangeMoney(e)}
              value={money.value}
              error={money.error}
              otherType="number"
              placeholder="enter the amount"
              disabled={!!moneysuggest}
              onRemoveText={() => setDeleteMoney(true)}
            />
            <h2 className="ml-2 mt-2 font-medium text-gray-700">
              {valueMoney} VNĐ {`x ${quantity}`}
            </h2>
            <h2 className="ml-2 text-sm font-medium text-gray-700">
              {valueMoneyText}
            </h2>
          </div>
          <div className="mt-2">
            <h2>Suggest</h2>
            <RenderSuggest
              onChange={setMoneySuggest}
              valueMoneySuggest={moneysuggest}
            />
          </div>
        </div>
        <div className=" my-5 mb-8 h-12 w-full px-3">
          <Button title="Add" onClick={onSubmitAddInvoice} height={3} />
        </div>
      </div>
    </div>
  );
};

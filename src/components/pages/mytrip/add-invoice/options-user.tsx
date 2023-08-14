/* eslint-disable no-param-reassign */
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button, Dropdown, Input } from '@/components/base';
import type { SelectOptionsInvoice } from '@/constants/select-options';
import { ACTIVITES } from '@/constants/select-options';
import { useConvertNumberTotextinVND, useFormatCurrentcy } from '@/hooks';

import { Quantity } from './quantity';
import { RenderSuggest } from './render-suggest';

export const OptionsUser = ({
  setInvoiceList,
  invoicelist,
  userUid,
}: {
  setInvoiceList: Dispatch<SetStateAction<SelectOptionsInvoice[]>>;
  invoicelist: SelectOptionsInvoice[];
  userUid: string;
}) => {
  const [activity, setActivity] = useState('shopping');
  const [others, setOthers] = useState({ value: '', error: '' });
  const [money, setMoney] = useState({ value: '', error: '' });
  const [moneysuggest, setMoneySuggest] = useState(0);
  const [quantity, setQuantity] = useState('1');

  const _handleChangeMoney = (e: string) => {
    if (e.length <= 9 && +e >= 0) {
      setMoney({ value: e, error: '' });
    }
  };

  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);
  const valueMoneyText = useMemo(() => {
    return useConvertNumberTotextinVND(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);

  useEffect(() => {
    if (moneysuggest !== 0) {
      setMoney({ value: '', error: '' });
    }
  }, [moneysuggest]);

  useEffect(() => {
    const value = invoicelist.find((item) => item.uid === userUid);
    if (value) {
      setActivity(value.activity);
      setMoney({ value: value.money.toString(), error: '' });
      setMoneySuggest(value.moneySuggest);
      setQuantity(value.qty.toString());
      if (value.activity === 'others')
        setOthers({ value: value.other || '', error: '' });
    } else {
      setMoney({ value: '', error: '' });
      setActivity('shopping');
      if (activity === 'others') setOthers({ value: '', error: '' });
      setMoneySuggest(0);
      setQuantity('1');
    }
  }, [invoicelist, userUid]);

  const isCheck = () => {
    let isError = false;
    if (!money.value && !moneysuggest) {
      isError = true;
      setMoney({
        value: '',
        error: 'Please enter an amount or choose a suggest',
      });
    }
    if (activity === 'others' && !others.value) {
      isError = true;
      setOthers({ value: '', error: 'Please enter another activity' });
    }
    if (money.value && +money.value < 1000) {
      isError = true;
      setMoney({
        ...money,
        error: 'The amount is too small, at least 1.000 VND',
      });
    }
    if (activity === 'others' && others.value && others.value.length < 3) {
      isError = true;
      setOthers({ ...others, error: 'Too short, at least 3 characters' });
    }
    return !isError;
  };

  const onSave = () => {
    if (isCheck()) {
      const value: SelectOptionsInvoice = {
        activity,
        money: +money.value,
        moneySuggest: moneysuggest,
        payerImage: {
          color: '',
          text: '',
          url: '',
        },
        payerName: '',
        qty: +quantity,
        time: '',
        uid: userUid,
        other: others.value,
        id: '',
      };
      if (invoicelist && invoicelist.find((item) => item.uid !== userUid)) {
        setInvoiceList((e) => [...e, value]);
      } else if (
        invoicelist &&
        invoicelist.find((item) => item.uid === userUid)
      ) {
        const values = invoicelist.map((item) => {
          if (item.uid === userUid) {
            return {
              activity,
              money: +money.value,
              moneySuggest: moneysuggest,
              payerImage: {
                color: '',
                text: '',
                url: '',
              },
              payerName: '',
              qty: +quantity,
              time: '',
              uid: userUid,
              other: others.value,
              id: '',
            };
          }
          return item;
        });
        setInvoiceList(values);
      } else {
        setInvoiceList([value]);
      }
      toast.success('Saved!');
    }
  };

  return (
    <div className="px-3">
      <Toaster />
      <div className="h-12 w-5/12">
        <Button
          onClick={onSave}
          bgWhite
          title="Save info for this user"
          textSmall
        />
      </div>
      <div className="dropdown mb-5 mt-3 h-96 overflow-auto pr-1">
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
            onChangeText={(e) => _handleChangeMoney(e)}
            value={money.value}
            error={money.error}
            otherType="number"
            placeholder="enter the amount"
            disabled={!!moneysuggest}
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
    </div>
  );
};

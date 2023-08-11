import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Dropdown, Input } from '@/components/base';
import type {
  SelectOptionsInvoice,
  SelectOptionsRenderDropDown,
  UserInformation,
} from '@/constants/select-options';
import { ACTIVITES } from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import {
  useConvertNumberTotextinVND,
  useFormatCurrentcy,
  useGetTimeAndDate,
} from '@/hooks';
import { selector } from '@/redux';

import { Quantity } from './quantity';
import { RenderSuggest } from './render-suggest';

export const OptionsAddInvoice = ({
  setUidAndMoney,
}: {
  setUidAndMoney: (uid: string, money: number) => void;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);

  const [valuepayer, setValuePayer] = useState('');
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');
  const [others, setOthers] = useState({ value: '', error: '' });
  const [money, setMoney] = useState({ value: '', error: '' });
  const [moneysuggest, setMoneySuggest] = useState(0);
  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);
  const [valueimage, setValueImage] = useState({
    url: currentUserInformation.photoURL.url,
    color: currentUserInformation.photoURL.color,
    text: currentUserInformation.photoURL.text,
  });
  const [quantity, setQuantity] = useState('');

  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+money.value);
  }, [money.value]);
  const valueMoneyText = useMemo(() => {
    return useConvertNumberTotextinVND(+money.value);
  }, [money.value]);

  const _handleChangeMoney = (e: string) => {
    if (e.length <= 9 && +e >= 0) {
      setMoney({ value: e, error: '' });
    }
  };

  useEffect(() => {
    if (moneysuggest !== 0) {
      setMoney({ value: '', error: '' });
    }
  }, [moneysuggest]);

  useEffect(() => {
    const handle = async () => {
      const userlist: UserInformation[] =
        await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
      const newArr: SelectOptionsRenderDropDown[] = userlist.map((item) => ({
        title: item.displayName,
        image: {
          url: item.photoURL.url,
          color: item.photoURL.color,
          text: item.photoURL.text,
        },
        value: item.uid,
      }));
      setPayerList(newArr);
    };
    handle();
  }, [currentIdJoinTrip]);

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
    if (activity === 'others' && others.value && others.value.length <= 3) {
      isError = true;
      setOthers({ ...others, error: 'Too short, at least 3 characters' });
    }
    return !isError;
  };

  const onSubmitAddInvoice = async () => {
    if (isCheck()) {
      const userlist = await DataFirebase.useGetUserList();
      const userinfo = userlist.find((item) => item.uid === valuepayer);
      const data: SelectOptionsInvoice = {
        actiity: activity,
        money: +money.value,
        moneySuggest: moneysuggest,
        payerImage: {
          url: valueimage.url || '',
          color: valueimage.color || '',
          text: valueimage.text || '',
        },
        payerName: userinfo?.displayName || '',
        time: useGetTimeAndDate(),
        description,
        qty: +quantity || 0,
        uid: valuepayer,
      };
      setUidAndMoney(valuepayer, +money.value || moneysuggest);
      await DataFirebase.useAddInvoiceIntoTripData(currentIdJoinTrip, data);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between px-2 pl-4">
      <div className="dropdown overflow-auto">
        <div className="pr-2">
          <div>
            <h2 className="mb-2 font-medium">Payer</h2>
            <Dropdown
              image
              option={payerlist}
              onClick={setValuePayer}
              defaultVitle={currentUserInformation.displayName}
              defaultImage={valueimage}
              onClickImage={(url, color, text) =>
                setValueImage({ url, color, text })
              }
            />
          </div>
          <div className="mt-2">
            <h2 className="mb-2 font-medium">Activities</h2>
            <Dropdown
              defaultVitle="Shopping"
              option={ACTIVITES}
              onClick={setActivity}
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
              title="Description"
              onChangeText={setDescription}
              value={description}
            />
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
              {valueMoney} VNĐ
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
      <div className="mb-9 h-12 w-full">
        <Button title="Add" onClick={onSubmitAddInvoice} />
      </div>
    </div>
  );
};

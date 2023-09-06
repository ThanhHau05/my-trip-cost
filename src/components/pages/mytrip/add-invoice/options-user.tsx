/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';

import { Dropdown, Input } from '@/components/base';
import { ACTIVITES, PRICEOPTIONS } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

import { Quantity } from './quantity';
import { RenderSuggest } from './render-suggest';

export const OptionsUser = () => {
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
    qtysuggest,
  } = useContext(MyTripContext);

  return (
    <div className="relative flex h-full flex-col items-center justify-between">
      <Toaster />
      <div className="mb-5 h-full w-full">
        <div className="scrollbarstyle mt-2 h-[calc(100%-200px)] overflow-auto pb-3 pl-3 pr-2">
          <Quantity onChange={setQuantity} valueQuantity={quantity} />
          <div className="mt-2">
            <h2 className="mb-2 font-medium">Activities</h2>
            <div className="flex flex-col gap-3">
              <Dropdown
                defaultTitle={activity}
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
              {valueMoney} VNĐ {`x ${quantity || qtysuggest}`}
            </h2>
            <h2 className="ml-2 text-sm font-medium text-gray-700">
              {valueMoneyText}
            </h2>
          </div>
          <div className="mt-2">
            <h2 className="font-medium drop-shadow-md">Suggest</h2>
            <h2 className="mb-2 mt-1 text-sm font-medium text-gray-800">
              Unit:{' '}
              <span className="font-bold text-gray-800 drop-shadow-md">
                VND
              </span>
            </h2>
            <RenderSuggest
              option={PRICEOPTIONS}
              onChange={setMoneySuggest}
              value={moneysuggest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

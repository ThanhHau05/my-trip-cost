/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';

import { Dropdown, Input } from '@/components/base';
import { ACTIVITES } from '@/constants/select-options';
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
  } = useContext(MyTripContext);

  return (
    <div className="px-3">
      <Toaster />
      <div className="dropdown mb-5 mt-3 h-400 overflow-auto pr-1">
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
    </div>
  );
};

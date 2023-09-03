import { useContext } from 'react';

import { Input } from '@/components/base';
import {
  QTYOPTIONS,
  type SelectOptionsRenderDropDown,
} from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

import { RenderSuggest } from './render-suggest';
import { RenderUserAddInvoice } from './render-user';

export const Quantity = ({
  valueQuantity,
  onChange,
  payerlist,
}: {
  valueQuantity: string;
  onChange: (value: string) => void;
  payerlist: SelectOptionsRenderDropDown[];
}) => {
  const { qtysuggest, setQtySuggest } = useContext(MyTripContext);
  return (
    <div>
      <h2 className="select-none font-medium drop-shadow-md">Quantity</h2>
      <RenderUserAddInvoice data={payerlist} />
      <Input
        title="Qty"
        value={valueQuantity}
        onChangeText={onChange}
        otherType="number"
        disabled={qtysuggest !== 0}
        placeholder="Ex: 11"
      />
      <div className="mt-4">
        <RenderSuggest
          option={QTYOPTIONS}
          onChange={setQtySuggest}
          value={qtysuggest}
        />
      </div>
      {/* <div>
          <input
            type="number"
            className="h-8 w-20 rounded-lg pl-2 outline-none drop-shadow-md"
            max={100}
            maxLength={3}
            onChange={(e) => handleOnChangeQuantity(e.target.value, onChange)}
            value={valueQuantity}
          />
        </div> */}
    </div>
  );
};

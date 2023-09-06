import { useContext } from 'react';

import { Input } from '@/components/base';
import { QTYOPTIONS } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

import { RenderSuggest } from './render-suggest';
import { RenderUserAddInvoice } from './render-user';

export const Quantity = ({
  valueQuantity,
  onChange,
}: {
  valueQuantity: string;
  onChange: (value: string) => void;
}) => {
  const { qtysuggest, setQtySuggest } = useContext(MyTripContext);
  return (
    <div>
      <h2 className="select-none font-medium drop-shadow-md">Quantity</h2>
      <RenderUserAddInvoice />
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
    </div>
  );
};

import { Invoice } from '@/components/base';
import type { SelectOptionsInvoice } from '@/constants/select-options';

export const RenderInvoice = ({ data }: { data: SelectOptionsInvoice[] }) => {
  return (
    <>
      {data.map((item) => (
        <Invoice
          key={item.time + item.payerName + item.money + item.moneySuggest}
          name={item.payerName}
          activity={
            item.activity.charAt(0).toUpperCase() + item.activity.slice(1)
          }
          qty={item.qty}
          money={item.money}
          time={item.time}
          url={item.payerImage.url}
          color={item.payerImage.color}
          text={item.payerImage.text}
        />
      ))}
    </>
  );
};

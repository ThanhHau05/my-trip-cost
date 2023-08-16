import { Invoice } from '@/components/base';
import type { SelectOptionsInvoice } from '@/constants/select-options';

export const RenderInvoice = ({
  data,
  showClose,
}: {
  data: SelectOptionsInvoice[];
  showClose?: boolean;
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data &&
        data.map((item) => (
          <Invoice
            key={item.id}
            name={item.payerName}
            activity={
              item.activity.charAt(0).toUpperCase() + item.activity.slice(1)
            }
            qty={item.qty}
            money={item.money || item.moneySuggest}
            time={item.time}
            url={item.payerImage.url}
            color={item.payerImage.color}
            text={item.payerImage.text}
            other={item.other || ''}
            id={item.id}
            showClose={showClose}
          />
        ))}
    </>
  );
};

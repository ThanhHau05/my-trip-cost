import { Invoice } from '@/components/base';
import type {
  SelectOptionsInvoice,
  UserInformation,
} from '@/constants/select-options';

export const RenderInvoice = ({
  data,
  userList,
  showClose,
}: {
  data: SelectOptionsInvoice[];
  showClose?: boolean;
  userList: UserInformation[];
}) => {
  return (
    <>
      {data.map((item) => (
        <Invoice
          key={item.id}
          data={item}
          showClose={showClose}
          userList={userList}
        />
      ))}
    </>
  );
};

import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type { SelectOptionsTrip } from '@/constants/select-options';
import { selector } from '@/redux';

import { onSubmitTemporaryNotice } from '../handler';
import { RenderInfoTemporaryNotice } from './RenderInfo';

export const TemporaryNotice = ({
  data,
  onSubmitValue,
  showTitle,
}: {
  data: SelectOptionsTrip;
  onSubmitValue?: () => void;
  showTitle?: boolean;
}) => {
  const { currentUserInformation } = useSelector(selector.user);

  return (
    <div className="fixed z-40 h-full w-full rounded-[40px] bg-slate-300/40 p-4 sm:w-[400px]">
      <div className="scrollbarstyle relative flex h-full w-full flex-col justify-between rounded-3xl bg-slate-50 pl-3 pr-1 pt-3">
        <RenderInfoTemporaryNotice data={data} showTitle={showTitle} />
        <div className="absolute bottom-20 left-0 z-10 h-12 w-full px-3">
          <Button
            title="OK"
            onClick={async () =>
              onSubmitTemporaryNotice({
                data,
                onSubmitValue,
                uid: currentUserInformation.uid,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

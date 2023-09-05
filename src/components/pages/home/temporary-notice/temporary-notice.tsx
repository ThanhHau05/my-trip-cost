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
    <div className="fixed top-0 z-40 h-full w-full bg-slate-700/20 pt-20 sm:w-[400px]">
      <div className=" h-full w-full rounded-t-[35px] bg-slate-300/40 p-4 pb-0">
        <div className="scrollbarstyle relative flex h-full w-full flex-col justify-between rounded-t-3xl bg-slate-50 pt-3">
          <RenderInfoTemporaryNotice data={data} showTitle={showTitle} />
          <div className="absolute bottom-4 left-0 z-10 h-12 w-full px-3">
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
    </div>
  );
};

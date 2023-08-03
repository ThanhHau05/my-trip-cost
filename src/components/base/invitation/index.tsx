import { Button } from '../button';

export const Invitation = ({
  tripid,
  tripname,
  name,
  time,
  date,
}: {
  tripid: number;
  tripname: string;
  name: string;
  time: string;
  date: string;
}) => {
  return (
    <div className="w-full rounded-3xl border bg-slate-50 px-3 py-2 shadow-md">
      <h2 className="text-sm">
        Trip ID: <span className="font-medium">{tripid}</span>
      </h2>
      <h2>
        You have just been added to the{' '}
        <span className="text-lg font-medium">{tripname}</span> trip by{' '}
        <span className="text-lg font-medium">{name}</span>
      </h2>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm">
          {time} - {date}
        </span>
        <div className="flex h-9 gap-2">
          <div className=" h-full w-20">
            <Button title="Join" />
          </div>
          <div className="h-full w-20">
            <Button bgWhite title="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
};

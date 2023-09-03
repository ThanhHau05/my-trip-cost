import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

export const RecentFriends = ({ data }: { data: UserInformation[] }) => {
  return (
    <div className="w-full px-5 pb-1">
      <h2 className="ml-2 text-sm font-medium uppercase text-gray-600 drop-shadow-md">
        Recent Friends
      </h2>
      <div className="mt-2" />
      {data.length !== 0 ? (
        <div className="flex flex-col gap-2">
          <RenderUser data={data} />
        </div>
      ) : (
        <h2 className="mt-2 text-xl font-medium text-gray-700">
          You haven&apos;t had any close friends on the recent trip
        </h2>
      )}
    </div>
  );
};

const RenderUser = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.uid}
          className="flex items-center justify-start gap-3 rounded-lg bg-slate-50 px-3 py-2 shadow"
        >
          <Avatar
            img={{
              url: item.photoURL.url || '',
              color: item.photoURL.color || '',
              text: item.photoURL.text || '',
            }}
            size="42"
          />
          <div>
            <h2 className="text-xl font-medium drop-shadow">
              {item.displayName}
            </h2>
            <h2 className="text-sm">
              Id:{' '}
              <span className="font-medium text-gray-700">
                {item.id ? item.id : "The user doesn't have an ID"}
              </span>
            </h2>
          </div>
        </div>
      ))}
    </>
  );
};

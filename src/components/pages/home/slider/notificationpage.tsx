import { BsCardList } from 'react-icons/bs';

export const NotificationPage = () => {
  return (
    <div className="h-full w-full rounded-t-[40px] bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center px-5 pt-4">
        <h2 className="text-center text-3xl font-medium text-gray-800 drop-shadow-md">
          There is no notification or invitation for any trip
        </h2>
        <BsCardList className="text-4xl text-gray-800 drop-shadow-md" />
      </div>
    </div>
  );
};

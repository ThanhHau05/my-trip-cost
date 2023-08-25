import clsx from 'clsx';

export const OptionsContainerWelcome = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  return (
    <div
      className={clsx('flex flex-col justify-between', show ? 'hidden' : null)}
    >
      <div>
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Welcome
        </h2>
        <span className="my-3 block text-sm text-gray-800/90 drop-shadow-lg">
          Start your trip and record all expenses with your companion on each
          excursion now!
        </span>
      </div>
      <div className="mt-3">
        <div
          className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow transition-all duration-200 hover:w-40 hover:shadow-lg"
          onClick={() => setShow(true)}
        >
          <h2 className="invisible absolute mb-0.5 mr-2 font-medium text-white drop-shadow-md group-hover:visible group-hover:static group-hover:delay-100">
            Sign in now
          </h2>
          <div className="relative flex flex-col justify-center shadow drop-shadow-md">
            <div className="absolute ml-0.5 h-2.5 w-2.5 rotate-[315deg] border-b-[3px] border-r-[3px] border-white" />
            <div className="h-[3px] w-3 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

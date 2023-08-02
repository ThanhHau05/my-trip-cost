import { VERTICAL_MENU } from '@/constants/select-options';

export const VerticalMenu = () => {
  return (
    <div className="fixed z-40 h-[calc(100%-66px)] w-[400px] rounded-t-[40px] bg-gray-900/50">
      <div className="ml-1 mt-1 h-full w-52 rounded-t-[36px] bg-gray-300 px-5 pt-5">
        <RenderItemVerticalMenu />
      </div>
    </div>
  );
};

const RenderItemVerticalMenu = () => {
  return (
    <div className="flex flex-col">
      {VERTICAL_MENU.map((item) => (
        <div
          key={item.value}
          className="mb-2 flex cursor-pointer items-center justify-start rounded-xl bg-slate-300 py-2"
        >
          {item.icon ? (
            <item.icon className="mx-2 text-xl text-gray-900" />
          ) : null}
          <h2 className="select-none">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

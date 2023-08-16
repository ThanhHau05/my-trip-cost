import { ImageUser, MenuBarsBox } from './options-header';

export const Header = ({
  name,
  image,
  id,
}: {
  name: string;
  image: {
    url?: string;
    color?: string;
    text?: string;
  };
  id: number;
}) => {
  return (
    <div className="flex h-20 w-full items-center justify-between px-3 py-2">
      <div className="flex items-center justify-center">
        <MenuBarsBox />
        <div className="pl-3">
          <h2 className="text-2xl font-bold leading-5 text-white drop-shadow-md">
            Hello {name}
          </h2>
          <span className="break-words text-sm text-white">
            Wish you have a pleasant trip!
          </span>
        </div>
      </div>
      <ImageUser image={image} id={id} name={name} />
    </div>
  );
};

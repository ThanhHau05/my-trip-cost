import { ImageUser, MenuBarsBox } from './options-header';

export const SimpleHeader = ({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: number;
}) => {
  return (
    <div className="flex items-center justify-between px-3 pt-2">
      <div className="flex items-center justify-center">
        <MenuBarsBox />
        <div className="pl-3">
          <h2 className="text-2xl font-bold leading-5 drop-shadow-md">
            Hello {name}
          </h2>
          <span className="break-words text-sm">
            Wish you have a pleasant trip!
          </span>
        </div>
      </div>
      <ImageUser image={image} id={id} />
    </div>
  );
};

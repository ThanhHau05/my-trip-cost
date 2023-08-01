import { RiLoaderLine } from 'react-icons/ri';

export const Loading = () => {
  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center bg-gray-500/20">
      <RiLoaderLine className="h-11 w-11 animate-spin text-gray-900" />
    </div>
  );
};

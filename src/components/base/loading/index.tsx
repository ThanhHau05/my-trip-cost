export const Loading = () => {
  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center bg-purple-200">
      <span className="h-20 w-20 animate-spin rounded-full border-8 border-x-blue-700 border-y-transparent" />
    </div>
  );
};

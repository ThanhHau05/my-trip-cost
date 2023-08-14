export const Quantity = ({
  valueQuantity,
  onChange,
}: {
  valueQuantity: string;
  onChange: (value: string) => void;
}) => {
  const _handleOnChange = (e: string) => {
    if (e.length <= 2 && +e >= 1 && +e <= 50) {
      onChange(e);
    }
  };
  return (
    <div className="h-8">
      <div className="flex h-full items-center justify-between">
        <h2 className="ml-2 select-none font-medium">Quantity</h2>
        <input
          type="number"
          className="h-8 w-20 rounded-lg pl-2 outline-none drop-shadow-md"
          max={100}
          maxLength={3}
          onChange={(e) => _handleOnChange(e.target.value)}
          value={valueQuantity}
        />
      </div>
    </div>
  );
};

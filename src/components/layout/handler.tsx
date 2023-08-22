export const onClickMoney = (
  setClickMoney: (value: boolean) => void,
  clickmoney: boolean,
  reservemoney: number,
) => {
  if (reservemoney) {
    setClickMoney(!clickmoney);
  }
};

export const handleCopyInfo = (
  value: string,
  setCopy: (value: boolean) => void,
) => {
  navigator.clipboard.writeText(value).then(() => {
    setCopy(true);
    const timer = setTimeout(() => {
      setCopy(false);
    }, 1500);
    return () => clearTimeout(timer);
  });
};

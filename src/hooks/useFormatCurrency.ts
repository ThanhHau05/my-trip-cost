export const useFormatCurrentcy = (money: number) => {
  const valueNumber = money.toLocaleString('vi-VN');
  const value = valueNumber.replace(/,/g, '.');
  return value;
};

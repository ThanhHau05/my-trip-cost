export const useChangeNameStyle = (name: string) => {
  const value = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const processedValue = value.replace(/\s+/g, '');
  const shortenedValue = processedValue.slice(0, 15);
  return shortenedValue;
};

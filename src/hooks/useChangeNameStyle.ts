export const useChangeNameStyle = (name: string) => {
  const value = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const processedValue = value.replace(/\s+/g, '');
  if (processedValue.length > 15) {
    return processedValue.slice(0, 15);
  }
  return processedValue;
};

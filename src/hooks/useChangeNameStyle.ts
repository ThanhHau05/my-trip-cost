export const useChangeNameStyle = (name: string) => {
  const value = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return value.replace(/\s+/g, '');
};

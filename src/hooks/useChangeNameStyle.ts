export const useChangeNameStyle = (name: string) => {
  const value = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

  const test = /[!@#$%^&*()_\-+=|/<>,:;"{}[\]?'.]/g;
  const result = value.replace(test, '');

  if (result.length > 15) {
    return result.slice(0, 15);
  }

  return result;
};

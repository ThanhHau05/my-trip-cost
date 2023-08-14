export const useRandomIdInvoice = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomChar = () =>
    characters[Math.floor(Math.random() * characters.length)];

  return `${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}`;
};

import { DataFirebase } from '@/firebase';

export const useTotalMoneyTheTrip = async (id: number) => {
  const trip = await DataFirebase.useGetTrip(id);
  if (trip) {
    const totalInvoice = trip.invoice;
    if (totalInvoice) {
      const total = totalInvoice.reduce((acc, item) => {
        const moneyToAdd =
          item.moneySuggest !== undefined ? item.moneySuggest : item.money;
        return acc + moneyToAdd;
      }, 0);
      return total;
    }
  }
  return 0;
};

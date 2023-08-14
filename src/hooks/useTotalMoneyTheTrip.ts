import { DataFirebase } from '@/firebase';

export const useTotalMoneyTheTrip = async (id: number) => {
  const trip = await DataFirebase.useGetTrip(id);
  if (trip) {
    const totalInvoice = trip.invoice;
    if (totalInvoice) {
      const total = totalInvoice.reduce(
        (a, item) => a + item.money * item.qty + item.moneySuggest * item.qty,
        0,
      );
      return total;
    }
  }
  return 0;
};

export const useGetTimeAndDate = () => {
  const currentTimeAndDate = new Date();
  const hour = currentTimeAndDate.getHours();
  const minutes = currentTimeAndDate.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';
  const day = currentTimeAndDate.getDate();
  const month = currentTimeAndDate.getMonth() + 1;
  const year = currentTimeAndDate.getFullYear();
  return `${hour}:${minutes} ${period} - ${month}/${day}/${year}`;
};

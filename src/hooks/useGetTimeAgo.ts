import { formatDistanceToNow, parse } from 'date-fns';
import { useEffect, useState } from 'react';

export const useGetTimeAgo = (time: string) => {
  const [timeago, setTimeAgo] = useState('');

  useEffect(() => {
    if (time) {
      const dateTime = parse(time, 'hh:mm a - MM/dd/yyyy', new Date());
      setTimeAgo(`${formatDistanceToNow(dateTime)} ago`);
    }
  }, [time]);
  return timeago;
};

import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [text, setText] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setText(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);
  return text;
};

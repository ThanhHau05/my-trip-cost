import { useEffect, useRef } from 'react';

export const useClickOutSide = (handle: () => void) => {
  const clickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const _handle = (e: any) => {
      if (e.button === 0) {
        if (!clickRef.current?.contains(e.target)) handle();
      }
    };
    document.addEventListener('mousedown', _handle);
    return () => document.addEventListener('mousedown', _handle);
  });
  return clickRef;
};

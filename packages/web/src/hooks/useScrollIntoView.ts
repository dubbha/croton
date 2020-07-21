import { useEffect } from 'react';

interface Dictionary<T> {
  [index: string]: T
};

export const useScrollIntoView = (refs: Dictionary<React.RefObject<HTMLElement>>) => {
  useEffect(() => {
    Object.entries(refs).forEach(([hash, ref]) => {
      if (`#${hash}` === window.location.hash) {
        ref.current?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }, [refs])
}

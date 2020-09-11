import { useState, useEffect } from 'react';

export const useMedia = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const handler = () => setMatches(media.matches);
    media.addListener(handler);
    return () => media.removeListener(handler);
  }, [query, matches]);

  return matches;
};

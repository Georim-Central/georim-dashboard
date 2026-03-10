import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const getMatches = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

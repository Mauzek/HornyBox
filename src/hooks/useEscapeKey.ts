import { useEffect } from 'react';

export const useEscapeKey = (
  callback: () => void,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [callback, enabled]);
};

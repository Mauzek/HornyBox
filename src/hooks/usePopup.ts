import { useState, useCallback } from 'react';

export const usePopup = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);
  
  const show = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);
  
  const toggle = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsVisible(prev => !prev);
  }, []);
  
  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

import { useEffect } from "react";
import type { RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  enabled = true,
  toggleButtonRef?: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (!enabled || !ref) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      const toggleButton = document.querySelector('[data-popup-toggle]');
      if (toggleButton && toggleButton.contains(target)) {
        return;
      }

      if (toggleButtonRef?.current && 
          (toggleButtonRef.current === target || 
           toggleButtonRef.current.contains(target))) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, enabled, toggleButtonRef]);
};

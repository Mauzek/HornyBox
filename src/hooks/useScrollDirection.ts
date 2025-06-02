import { useEffect, useCallback, useRef } from "react";

export const useScrollDirection = (threshold = 50) => {
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const isScrollingUp = scrollTop < lastScrollY.current;
    const isScrolled = scrollTop > threshold;

    if (headerRef.current) {
      const shouldHide = isScrolled && !isScrollingUp;
      headerRef.current.style.setProperty(
        "--header-hidden",
        shouldHide ? "1" : "0"
      );
    }

    lastScrollY.current = scrollTop;
  }, [threshold]);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  return { headerRef };
};

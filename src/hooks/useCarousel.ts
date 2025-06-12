import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  slidesCount: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const useCarousel = ({
  slidesCount,
  autoPlay = true,
  autoPlayInterval = 5000,
}: UseCarouselOptions) => {
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (target: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIndex(target);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide(index + 1);
  }, [index, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(index - 1);
  }, [index, goToSlide]);

  useEffect(() => {
    if (!autoPlay || slidesCount <= 1) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, slidesCount]);

  return {
    index,
    setIndex,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index < 0 || index >= slidesCount) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, slidesCount]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slidesCount;
    goToSlide(next);
  }, [currentSlide, slidesCount, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = currentSlide === 0 ? slidesCount - 1 : currentSlide - 1;
    goToSlide(prev);
  }, [currentSlide, slidesCount, goToSlide]);

  useEffect(() => {
    if (!autoPlay || slidesCount <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, slidesCount]);

  return {
    currentSlide,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
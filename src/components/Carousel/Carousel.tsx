import React, { useEffect } from "react";
import { useCarousel } from "../../hooks";
import { BannerSlide } from "./BannerSlide";
import { ArticleSlide } from "./ArticleSlide";
import type { CarouselProps } from "./types";
import styles from "./Carousel.module.scss";

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  type,
  interval = 5000,
}) => {
  const total = slides.length;
  const fullSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const fullLength = fullSlides.length;
  const { index, setIndex, goToSlide, isTransitioning } = useCarousel({
    slidesCount: fullLength,
    autoPlay: true,
    autoPlayInterval: interval,
  });

  useEffect(() => {
    if (!isTransitioning) {
      if (index === 0) {
        setTimeout(() => setIndex(total), 0);
      } else if (index === total + 1) {
        setTimeout(() => setIndex(1), 0);
      }
    }
  }, [index, total, isTransitioning, setIndex]);

  return (
    <div className={`${styles.carousel} ${styles[`carousel--${type}`]}`}>
      <div
        className={styles.carousel__container}
        role="region"
        aria-roledescription="carousel"
      >
        <div className={styles.carousel__viewport}>
          <div
            className={styles.carousel__content}
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            {fullSlides.map((slide, i) => {
              if (Math.abs(i - index) > 1) return null;
              const isActive = i === index;
              const slideProps = {
                key: `slide-${i}`,
                slide,
                isActive,
                index: i,
              };
              if (type === "banner")
                return (
                  <BannerSlide
                    key={slideProps.key}
                    slide={slideProps.slide}
                    isActive={slideProps.isActive}
                  />
                );
              if (type === "article")
                return (
                  <ArticleSlide key={slideProps.key} slide={slideProps.slide} isActive={slideProps.isActive} />
                );
              return null;
            })}
          </div>

          <div className={styles.carousel__indicators}>
            {slides.map((_, i) => (
              <button
                key={`indicator-${i}`}
                className={`${styles.carousel__indicator} ${
                  i + 1 === index ? styles["carousel__indicator--active"] : ""
                }`}
                onClick={() => goToSlide(i + 1)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

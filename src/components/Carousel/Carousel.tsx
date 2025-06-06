import React from 'react';
import { useCarousel } from '../../hooks';
import { BannerSlide } from './BannerSlide';
import { ArticleSlide } from './ArticleSlide';
import type { CarouselProps } from './types';
import styles from './Carousel.module.scss';

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  type,
  interval = 5000,
}) => {
  const { currentSlide, goToSlide } = useCarousel({
    slidesCount: slides.length,
    autoPlay: true,
    autoPlayInterval: interval,
  });

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${styles[`carousel--${type}`]}`}>
      <div className={styles.carousel__container} role="region" aria-roledescription="carousel">
        <div className={styles.carousel__viewport}>
          <div 
            className={styles.carousel__content}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              
              const slideProps = {
                key: slide.id,
                slide,
                isActive,
                index,
              };

              if (type === 'banner') {
                return <BannerSlide {...slideProps} />;
              }

              if (type === 'article') {
                return <ArticleSlide {...slideProps} />;
              }

              return null;
            })}
          </div>

          <div className={styles.carousel__indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.carousel__indicator} ${
                  index === currentSlide ? styles['carousel__indicator--active'] : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

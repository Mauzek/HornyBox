import React from 'react';
import { Link } from 'react-router-dom';
import type { BannerSlideProps } from './types';
import styles from './BannerSlide.module.scss';

export const BannerSlide: React.FC<BannerSlideProps> = ({
  slide,
}) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={styles.slide}
    >
      <div className={styles.slide__content}>
        <Link 
          to={`/game/${slide.gameName.toLowerCase().replace(/\s+/g, '_')}`} 
          className={styles.slide__link}
        >
        </Link>
        
        <picture className={styles.slide__picture}>
          <source 
            srcSet={slide.imageMobile} 
            media="(max-width: 640px)" 
          />
          <img
            src={slide.imagePc}
            alt={slide.title}
            className={styles.slide__image}
            decoding="auto"
          />
        </picture>

      </div>

      <div className={styles['slide__title-mobile']}>
        <p className={styles['slide__title-mobile-text']}>{slide.title}</p>
        {slide.description && (
          <p className={styles['slide__description-mobile']}>
            {slide.description.header}
          </p>
        )}
      </div>
    </div>
  );
};

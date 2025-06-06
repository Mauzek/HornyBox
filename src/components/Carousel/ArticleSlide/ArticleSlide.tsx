import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleSlide.module.scss';
import type { ArticleSlideProps } from './types';

export const ArticleSlide: React.FC<ArticleSlideProps> = ({
  slide,
}) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`${styles.slide}`}
    >
      <Link 
        to={`/articles/${slide.id}`} 
        className={styles.slide__link}
      >
        <div className={styles.slide__content}>
          <span className={styles['slide__game-name']}>{slide.gameName}</span>
          <h3 className={styles.slide__title}>{slide.title}</h3>
          {slide.description && (
            <div className={styles.slide__description}>
              <h4 className={styles['slide__description-header']}>
                {slide.description.header}
              </h4>
              <p className={styles['slide__description-body']}>
                {slide.description.body}
              </p>
            </div>
          )}
        </div>
        <div className={styles['slide__image-container']}>
          <img
            src={slide.imagePc}
            alt={slide.title}
            className={styles.slide__image}
          />
        </div>       
      </Link>
    </div>
  );
};

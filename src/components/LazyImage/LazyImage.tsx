import React from 'react';
import {useLazyLoad} from '../../hooks';

interface LazyImageProps {
    src: string;
    alt: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
    const { ref, isVisible } = useLazyLoad();

    return (
        <img
            ref={ref}
            src={isVisible ? src : undefined}
            alt={alt}
            loading="lazy"
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

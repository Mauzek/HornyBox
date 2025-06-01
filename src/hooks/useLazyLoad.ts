import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseLazyLoadReturn {
    ref: RefObject<HTMLImageElement>;
    isVisible: boolean;
}

export function useLazyLoad(): UseLazyLoadReturn {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLImageElement>(null as unknown as HTMLImageElement);

    useEffect(() => {
        // Создаем экземпляр IntersectionObserver
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null, // относительно viewport
                threshold: 0.1, // 10% элемента должно быть видно
                rootMargin: '200px', // начинать загрузку за 200px до появления элемент
            }
        );

        // Сохраняем текущее значение ref.current в переменную
        const currentRef = ref.current;

        // Начинаем наблюдение, если ref.current существует
        if (currentRef) {
            observer.observe(currentRef as HTMLImageElement);
        }

        // Возвращаем функцию очистки
        return () => {
            // Используем сохраненное значение currentRef
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return { ref, isVisible };
}

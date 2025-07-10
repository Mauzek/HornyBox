import styles from "./Videos.module.scss";
import { ContentGrid, FAQGrid, Preloader, Section } from "../../components";
import { useGetVideosQuery } from "../../store";
import { useEffect } from "react";
import { usePreloader } from "../../hooks/usePreloader";

const faqData = [
  {
    id: 1,
    question: "Что за блогеры?",
    answer:
      "<p>Это официальные партнеры/контент-мейкеры HornyBox, которые имеют огромную аудиторию и делают замечательный контент по играм HoYoverse и не только.</p>",
  },
  {
    id: 2,
    question: "Зачем нужна эта страница?",
    answer:
      "<p>Для твоего же удобства. Смотреть видео твоих любимых блогеров, не покидая сайт HornyBox!</p>",
  },
];

export const VideosPage = () => {
  const { data, isLoading } = useGetVideosQuery();
  const { shouldShowPreloader, handlePreloaderComplete } = usePreloader({
    isLoading,
  });

  useEffect(() => {
    document.title = "Видео от наших любимых блогеров на HornyBox";
  }, []);

  if (!data) {
    return (
      <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />
    );
  }

  return (
    <>
      {shouldShowPreloader && (
        <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />
      )}

      <section className={styles.page}>
        <h1 className={styles.page__title}>Все видео</h1>
        <ContentGrid id="videos" items={data} gap={15} />

        <Section title="FAQ" id="faq">
          <FAQGrid items={faqData} />
        </Section>
      </section>
    </>
  );
};

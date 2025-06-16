import { Carousel, ContentGrid, Section } from "../../components";
import { ItemGrid } from "../../components/ItemGrid";
import { useGetAssetsQuery } from "../../store";
import type { Banner } from "../../types";
import styles from "./Home.module.scss";

export const HomePage = () => {
  document.title = "HornyBox - магазин выгодных донатов и попоплнений";
  const { data, error} = useGetAssetsQuery();
  
  if (error || data === undefined) return <p>Error</p>;
  
  const carouselSlides = data.banners.reduce(
    (acc, item) => {
      if (item.description === null) {
        acc.banners.push(item);
      } else {
        acc.articles.push(item);
      }
      return acc;
    },
    { banners: [] as Banner[], articles: [] as Banner[] }
  );

  return (
    <section className={styles.page}>
      <div className={styles.page__title}>
        <h1>Донат и пополнения</h1>
      </div>

      <Carousel slides={carouselSlides.banners} type="banner" interval={5000} />

      <Section title="Популярное" id="popular">
        <ItemGrid items={data.popular} itemSize="medium" id="popular" />
      </Section>

      <Carousel slides={carouselSlides.articles} type="article" interval={5000} />

      <Section title="Сервисы" id="services">
        <ItemGrid items={data.services} split={true} itemSize="small" />
      </Section>

      <Section title="Игры" id="game">
        <ItemGrid items={data.games} split={true} itemSize="small" />
      </Section>

      <Section title="Доступно в боте" id="bot">
        <ItemGrid items={data.availableInBot} itemSize="medium" />
      </Section>

      <Section title="Видео" id="videos">
        <ContentGrid id="videos" items={data.videos} />
      </Section>

      <Section title="Статьи" id="articles">
         <ContentGrid id="articles" items={data.articles}  gap={20}/>
      </Section>
    </section>
  );
};

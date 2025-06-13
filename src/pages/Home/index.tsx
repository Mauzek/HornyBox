import { Carousel, Section } from "../../components";
import { ItemGrid } from "../../components/ItemGrid";
import { useGetAssetsQuery } from "../../store";
import styles from "./Home.module.scss";

export const HomePage = () => {
  document.title = "HornyBox - магазин выгодных донатов и попоплнений";
  const { data, error, isLoading } = useGetAssetsQuery();
  if (data === undefined) return <p>Loading...</p>;
  const banners = data?.banners.filter((banner) => banner.description === null);
  console.log("render");
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <section className={styles.page}>
      <div className={styles.page__title}>
        <h1>Донат и пополнения</h1>
      </div>

      <Carousel slides={banners} type="banner" interval={5000} />

      <Section title="Популярное" id="popular">
        <ItemGrid items={data.games.slice(0, 2)} type="rectangle" />
        <ItemGrid items={data.popular} />
      </Section>
    </section>
  );
};

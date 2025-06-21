import { Carousel, ContentGrid, FAQGrid, Section } from "../../components";
import { ItemGrid } from "../../components/ItemGrid";
import { useGetAssetsQuery } from "../../store";
import type { Banner } from "../../types";
import styles from "./Home.module.scss";

const faqData = [
  {
    id: 1,
    question: "Насколько быстрое у вас пополнение?",
    answer:
      "<p>Пополнение происходит как правило мгновенно, однако задержка может составлять до двух часов. Если товар не пришел по истечении этого времени, наша поддержка поможет решить вопрос.</p>",
  },
  {
    id: 2,
    question: "Это безопасно?",
    answer:
      "<p>Да, мы работаем только с официальными партнерами, которые служат гарантом качества.</p>",
  },
  {
    id: 3,
    question: "Как образуется цена?",
    answer:
      "<p>Есть изначальная цена товара, которая зависит от курса рубля, и наша цена продажи. Но, кроме этого, существуют дополнительные расходы, как: оплата банковской комиссии за факт оплаты; налог на прибыль; оплата услуг банка; пенсионные, медицинские, социальные, страховые взносы; оплата работы сотрудников; оплата и ведение кассы; прочие расходы, не говоря уже о трудозатратах на поддержание стабильной работы. Конечно, если работать «в чёрную», зарегистрироваться в другой стране и не платить почти ничего из вышеперечисленного, то цену можно сильно снизить, но насколько подобная схема будет безопасна для аккаунта — это вопрос отдельного обсуждения.</p>",
  },
  {
    id: 4,
    question: "Можно ли купить еще дешевле?",
    answer:
      "<p>Да, мы уведомляем о предстоящих скидках, бонусах в самой игре, а также выгодных предложениях <a href='https://t.me/HornyGem' target='_blank' rel='noopener'>непосредственно от нас</a>.</p>",
  },
];

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

      <Section title="FAQ" id="faq">
          <FAQGrid items={faqData}/>
      </Section>
    </section>
  );
};

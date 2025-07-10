import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  AccordionGameInfo,
  Breadcrumb,
  FAQGrid,
  Preloader,
  ProductCart,
  ProductGrid,
  ProductHeader,
  Section,
} from "../../components";
import { useGetProductsQuery } from "../../store";
import { usePreloader } from "../../hooks/usePreloader";

export const ProductPage = () => {
  const params = useParams();
  const { productName, category } = params;
  const { data, isLoading } = useGetProductsQuery(productName!, {
    skip: !productName,
  });
  const { shouldShowPreloader, handlePreloaderComplete } = usePreloader({
    isLoading,
  });

  const categoryData = useMemo(() => {
    if (!data?.category || !category) return null;
    return data.category.find((item) => item.link === category) || null;
  }, [data?.category, category]);

  const productsData = useMemo(() => {
    if (!data?.products) return null;
    if (category && categoryData) {
      return data.products.filter(
        (item) => item.category.id === categoryData.id
      );
    }
    return data.products;
  }, [data?.products, category, categoryData]);

  useEffect(() => {
    if (!data?.name) return;
    const title =
      category && categoryData
        ? `Купить ${categoryData.description} в ${data.name}`
        : `Донат в ${data.name}`;
    document.title = title;
  }, [data?.name, category, categoryData]);

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

      <section>
        <Breadcrumb breadcrumb={params} lable={data.name} />
        <ProductHeader
          title={data.name}
          image={data.image}
          categories={data.category || []}
          types={data.type || []}
        />
        <section style={{ display: "flex", gap: "25px" }}>
          <ProductGrid
            products={productsData || []}
            productName={productName!}
          />
          <ProductCart productName={productName!} payments={data.payments} />
        </section>

        <AccordionGameInfo
          title="Описание игры"
          description={data.description}
        />

        {data.faq && (
          <Section title="FAQ" id="faq">
            <FAQGrid items={data.faq} />
          </Section>
        )}
      </section>
    </>
  );
};

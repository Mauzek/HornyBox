import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  Breadcrumb,
  FAQGrid,
  ProductGrid,
  ProductHeader,
  Section,
} from "../../components";
import { useGetGameProductsQuery } from "../../store";

export const GamePage = () => {
  const params = useParams();
  const { gameName, category } = params;
  const { data, isLoading } = useGetGameProductsQuery(gameName!, {
    skip: !gameName,
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

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Breadcrumb breadcrumb={params} lable={data.name} />
      <ProductHeader
        title={data.name}
        image={data.image}
        categories={data.category || []}
        types={data.type || []}
      />
      <section style={{ display: "flex" }}>
        <ProductGrid products={productsData || []} gameName={gameName!} />
      </section>

      <Section title="FAQ" id="faq">
        <FAQGrid items={data.faq} />
      </Section>
    </section>
  );
};

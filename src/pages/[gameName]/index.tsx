import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Breadcrumb, ProductHeader } from "../../components";
import { useGetGameProductsQuery } from "../../store";

export const GamePage = () => {
  const params = useParams();
  const { gameName, category } = params;
  const { data, isLoading } = useGetGameProductsQuery(gameName!, {
    skip: !gameName,
  });
  const categoryData = data?.category.find((item) => item.link === category);

  useEffect(() => {
    if (data?.name) {
      document.title = category
        ? `Купить ${categoryData?.description} в ${data.name}`
        : `Донат в ${data.name}`;
    }
  }, [data?.name, category, categoryData]);

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Breadcrumb breadcrumb={params} lable={data.name} />
      <ProductHeader title={data.name} image={data.image} categories={data.category} />
    </section>
  );
};

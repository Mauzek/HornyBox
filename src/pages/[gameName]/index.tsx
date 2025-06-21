import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../components";

export const GamePage = () => {
  const params = useParams();
  const { gameName, category } = params;
  document.title = category ? `Купить ${category} в ${gameName}` : `Донат в ${gameName}`
  return (
    <section>
      <Breadcrumb breadcrumb={params} lable="Genshin Impact"/>
      <h1>{gameName}</h1>
      <h2>{category}</h2>
    </section>
  );
}

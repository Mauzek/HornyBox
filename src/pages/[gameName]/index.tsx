import { useParams } from "react-router-dom";

export const GamePage = () => {
  const {gameName, category} = useParams();
  document.title = category ? `Купить ${category} в ${gameName}` : `Донат в ${gameName}`
  return (
    <div>GamePage</div>
  )
}

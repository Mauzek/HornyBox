import { useParams } from "react-router-dom";

export const GamePage = () => {
  const {gameName} = useParams();  
  document.title = `Донат в ${gameName}`
  return (
    <div>GamePage</div>
  )
}

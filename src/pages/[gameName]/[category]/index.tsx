
import { useParams } from 'react-router-dom'

export const GameCategoryPage = () => {
  const { gameName, category } = useParams();  
  document.title = `Купить ${category} в ${gameName}`
  return (
    <div>GameCategoryPage</div>
  )
}

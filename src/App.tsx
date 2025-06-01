import './App.css'
import { useGetAssetsQuery} from './store';
import { LazyImage } from './components/LazyImage/LazyImage'

function App() {
const { data, error, isLoading } = useGetAssetsQuery();
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;
  console.log(data);
  return (
    <div>
      <h1>Баннеры:</h1>
      <ul>
        {data?.banners?.map((banner) => (
          <li key={banner.id}>
            <LazyImage src={banner.imagePc} alt={banner.title}/>
            <h2>{banner.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

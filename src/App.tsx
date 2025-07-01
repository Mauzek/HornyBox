import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import {
  HomePage,
  AuthPage,
  ProfilePage,
  VideoPage,
  ContentPage,
  FAQPage,
  AboutPage,
  PoliticsPage,
  ProductPage,
  NotFoundPage,
  SteamPage,
} from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* Страницы авторизации и профиля */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Дополнительные страницы */}
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/politics" element={<PoliticsPage />} />

        {/* Динамические маршруты для игр */}
        <Route path="/games/:productName/:category?" element={<ProductPage />} />

        <Route path="/services/steam" element={<SteamPage />} />
        <Route path="/services/:productName" element={<ProductPage />} />

        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

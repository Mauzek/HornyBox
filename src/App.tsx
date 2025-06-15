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
  GamePage,
  GameCategoryPage,
  NotFoundPage,
  SteamPage,
  ServicePage,
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
        <Route path="/games/:gameName" element={<GamePage />} />
        <Route
          path="/games/:gameName/:category"
          element={<GameCategoryPage />}
        />
        <Route path="/services/steam" element={<SteamPage />} />
        <Route path="/services/:serviceName" element={<ServicePage />} />

        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import {
  HomePage,
  AuthPage,
  ProfilePage,
  VideosPage,
  ContentPage,
  FAQPage,
  AboutPage,
  PoliticsPage,
  ProductPage,
  NotFoundPage,
  SteamPage,
} from "./pages";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const {isAuthenticated} = useSelector((state: RootState) => state.user);
  return (
    <Layout>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* Страницы авторизации и профиля */}
        <Route path="/auth" element={
            isAuthenticated ? 
              <Navigate to="/profile" replace /> : 
              <AuthPage />
          }  />
        <Route path="/profile" element={
            !isAuthenticated ? 
              <Navigate to="/auth" replace /> : 
              <ProfilePage />
          }  />

        {/* Дополнительные страницы */}
        <Route path="/videos" element={<VideosPage />} />
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

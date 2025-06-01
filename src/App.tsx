import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Главная страница */}
        <Route index path="/" element={<div>Home</div>} />

        {/* Страницы авторизации и профиля */}
        <Route path="/auth" element={<div>Auth</div>} />
        <Route path="/profile" element={<div>Profile</div>} />

        {/* Динамические маршруты для игр */}
        <Route path="/:gameName" element={<div>Game</div>} />
        <Route path="/:gameName/:category" element={<div>Game category</div>} />

        {/* Дополнительные страницы */}
        <Route path="/videos" element={<div>Videos</div>} />
        <Route path="/content" element={<div>Content</div>} />
        <Route path="/faq" element={<div>FAQ</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/politics" element={<div>Politics</div>} />

        {/* Страница 404 */}
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Layout } from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import PatternDetail from "./pages/PatternDetail";

export function App() {
  return (
    <BrowserRouter basename="/catalogo-padroes-projeto">
      <Layout>
        <Header />
        <Body>
          <Routes>
            <Route path="/*" element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<Home />} />
            <Route path="categoria/:category" element={<Category />} />
            <Route
              path="categoria/:category/padrao/:pattern"
              element={<PatternDetail />}
            />
          </Routes>
        </Body>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

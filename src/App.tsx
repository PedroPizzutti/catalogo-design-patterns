import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Layout } from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Creational } from "./pages/Creational";
import { Structural } from "./pages/Structural";
import { Behavioral } from "./pages/Behavioral";

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Body>
          <Routes>
            <Route path="/*" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/criacionais" element={<Creational />} />
            <Route path="/estruturais" element={<Structural />} />
            <Route path="/comportamentais" element={<Behavioral />} />
          </Routes>
        </Body>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

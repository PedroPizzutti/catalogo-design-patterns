import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Layout } from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Body>
          <Home />
        </Body>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

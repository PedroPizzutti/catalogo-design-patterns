import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Layout } from "./components/Layout";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Body>
          <div className="bg-bg text-content p-6">
            <h1 className="text-2xl font-bold">Strategy Pattern</h1>

            <p className="text-content-secondary">
              Permite trocar algoritmos dinamicamente...
            </p>

            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded">
              Ver mais
            </button>
          </div>
        </Body>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

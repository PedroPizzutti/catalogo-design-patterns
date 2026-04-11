import { Card } from "../../components/Card";
import { Page } from "../../components/Page";

export function Creational() {
  return (
    <Page title="Padrões Criacionais">
      <section className="mx-auto px-6 py-10 space-y-3">
        <section>
          <p>
            <em>
              <strong className="text-xl">Creational Patterns</strong>
            </em>{" "}
            abstraem o processo de instanciar objetos. Em vez de espalhar{" "}
            <em>new </em>
            (ou comandos de criação direta) por todo o código, esses padrões
            centralizam e controlam como os objetos são formados, garantindo que
            o sistema permaneça independente de como seus componentes são
            criados, compostos e representados.
          </p>
        </section>
        <section className="flex-grid">
          <Card title="aleluia" description="mais aleluia"></Card>
          <Card title="aleluia" description="mais aleluia"></Card>
          <Card title="aleluia" description="mais aleluia"></Card>
          <Card title="aleluia" description="mais aleluia"></Card>
        </section>
      </section>
    </Page>
  );
}

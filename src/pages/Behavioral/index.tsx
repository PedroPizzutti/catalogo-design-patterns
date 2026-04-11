import { Page } from "../../components/Page";

export function Behavioral() {
  return (
    <Page title="Padrões Comportamentais">
      <section className="mx-auto px-6 py-10 space-y-3">
        <p>
          <em>
            <strong className="text-xl">Behavioral Patterns</strong>
          </em>{" "}
          focam nos algoritmos e na atribuição de responsabilidades entre
          objetos. Eles não se preocupam apenas com a conexão entre as partes,
          mas com o mensageiro: como a informação viaja, quem toma a decisão e
          como o estado do sistema evolui sem que os objetos fiquem
          "dependentes" uns dos outros.
        </p>
      </section>
    </Page>
  );
}

import { Page } from "../../components/Page";

export function Structural() {
  return (
    <Page title="Padrões Estruturais">
      <section className="mx-auto px-6 py-10 space-y-3">
        <p>
          <em>
            <strong className="text-xl">Structural Patterns</strong>
          </em>{" "}
          tratam da forma como classes e objetos são organizados para compor
          estruturas complexas de maneira eficiente. Seu principal objetivo é
          reduzir o acoplamento, facilitar a reutilização e tornar o sistema
          mais flexível, por meio de soluções que simplificam a integração e a
          comunicação entre diferentes partes do software.
        </p>
      </section>
    </Page>
  );
}

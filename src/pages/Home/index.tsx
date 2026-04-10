import { Page } from "../../components/Page";

export function Home() {
  return (
    <Page title="O que são?">
      <section className="mx-auto px-6 py-10 space-y-3">
        <p>
          <strong className="text-xl">
            Padrões de Projeto (<em>Design Patterns</em>)
          </strong>{" "}
          são soluções reutilizáveis para problemas comuns no design de software
          orientado a objetos. Eles não são códigos prontos, mas modelos que
          orientam a organização de classes e objetos. A ideia foi popularizada
          pelo livro
          <em>
            "Design Patterns: Elements of Reusable Object-Oriented Software"
          </em>
          , com o objetivo de evitar a reinvenção de soluções e promover
          sistemas mais flexíveis e fáceis de manter.
        </p>

        <h2 className="text-xl font-medium pt-4">Os 4 Elementos Essenciais</h2>
        <p>
          <strong className="text-lg">
            Para a Gang of Four (<em>GoF</em>)
          </strong>
          , uma solução só é considerada um padrão de projeto se ela for
          composta por quatro elementos críticos:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>O Nome:</strong> Um identificador que aumenta o vocabulário
            de design da equipe. Nomear um padrão permite que designers discutam
            soluções em alto nível de abstração sem entrar em detalhes de
            implementação.
          </li>
          <li>
            <strong>O Problema:</strong> Descreve quando aplicar o padrão,
            explicando o contexto e as condições necessárias. Ele identifica as
            situações em que o design atual pode ser rígido ou ineficiente.
          </li>
          <li>
            <strong>A Solução:</strong> Define os componentes (classes e
            objetos), suas responsabilidades e a forma como eles colaboram entre
            si. A solução é abstrata, servindo como um guia que pode ser
            implementado de diferentes formas dependendo da linguagem ou do
            sistema.
          </li>
          <li>
            <strong>As Consequências:</strong> São os resultados e as trocas
            (trade-offs) decorrentes da aplicação do padrão. Isso inclui o
            impacto na flexibilidade, portabilidade e extensibilidade do
            sistema, ajudando o desenvolvedor a entender se o custo de
            complexidade vale o benefício obtido.
          </li>
        </ul>

        <h2 className="text-xl font-medium pt-4">Classificação e Propósito</h2>
        <p>
          Os padrões são organizados em três famílias principais, baseadas na
          intenção da solução:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Criacionais:</strong> Abstraem o processo de instanciação,
            tornando o sistema independente de como seus objetos são criados.
          </li>
          <li>
            <strong>Estruturais:</strong> Focam na composição de classes e
            objetos para formar estruturas maiores e mais complexas.
          </li>
          <li>
            <strong>Comportamentais:</strong> Concentram-se nos algoritmos, na
            comunicação entre objetos e na distribuição de responsabilidades.
          </li>
        </ul>

        <p className="pt-4">
          Em resumo, padrões de projeto ajudam a construir sistemas mais
          organizados, flexíveis e preparados para evolução.
        </p>
      </section>
    </Page>
  );
}

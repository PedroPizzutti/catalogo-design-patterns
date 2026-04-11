import type { PatternCategories } from "../model/PatternCategories";

export class PatternsFactory {
  public static create(type: PatternCategories) {
    switch (type) {
      case "CREATIONAL":
        return [
          {
            name: "Singleton",
            description:
              "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.",
            useWhen:
              "Você precisa de um controle estrito sobre uma instância global, como em conexões de banco de dados ou logs.",
          },
          {
            name: "Factory Method",
            description:
              "Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.",
            useWhen:
              "Você não sabe de antemão os tipos exatos e dependências dos objetos com os quais seu código deve trabalhar.",
          },
          {
            name: "Abstract Factory",
            description:
              "Permite produzir famílias de objetos relacionados sem especificar suas classes concretas.",
            useWhen:
              "Seu código precisa trabalhar com diversas famílias de produtos relacionados, mas não deve depender das classes concretas deles.",
          },
          {
            name: "Builder",
            description:
              "Separa a construção de um objeto complexo da sua representação, permitindo diferentes configurações.",
            useWhen:
              "Você precisa criar um objeto com muitos parâmetros opcionais ou quando o processo de construção é muito complexo.",
          },
          {
            name: "Prototype",
            description:
              "Permite copiar objetos existentes sem tornar seu código dependente de suas classes.",
            useWhen:
              "A criação de um novo objeto é mais cara ou complexa do que clonar um objeto já existente.",
          },
        ];
      case "STRUCTURAL":
        return [
          {
            name: "Adapter",
            description:
              "Permite que objetos com interfaces incompatíveis colaborem entre si.",
            useWhen:
              "Você quer usar uma classe existente, mas a interface dela não é compatível com o resto do seu código.",
          },
          {
            name: "Bridge",
            description:
              "Divide uma classe grande em duas hierarquias separadas (abstração e implementação).",
            useWhen:
              "Você quer dividir uma classe que tem várias variantes de uma funcionalidade (ex: diferentes plataformas de exibição).",
          },
          {
            name: "Composite",
            description:
              "Permite compor objetos em estruturas de árvores e trabalhar com elas como se fossem objetos individuais.",
            useWhen:
              "Você precisa implementar uma estrutura de objetos em árvore, como menus de interface ou sistemas de arquivos.",
          },
          {
            name: "Decorator",
            description:
              "Permite adicionar novos comportamentos a objetos dinamicamente, colocando-os dentro de invólucros.",
            useWhen:
              "Você precisa adicionar responsabilidades a objetos em tempo de execução sem quebrar o código que usa esses objetos.",
          },
          {
            name: "Facade",
            description:
              "Fornece uma interface simplificada para uma biblioteca, um framework ou qualquer sistema complexo.",
            useWhen:
              "Você precisa de uma interface limitada, mas clara, para um subsistema complexo ou uma biblioteca de terceiros.",
          },
          {
            name: "Flyweight",
            description:
              "Permite ajustar mais objetos na quantidade disponível de RAM compartilhando estados comuns.",
            useWhen:
              "Seu programa precisa gerar um número enorme de objetos e o consumo de memória RAM está se tornando um problema.",
          },
          {
            name: "Proxy",
            description:
              "Fornece um substituto ou marcador de lugar para outro objeto para controlar o acesso a ele.",
            useWhen:
              "Você precisa de um controle de acesso, cache ou inicialização preguiçosa (lazy loading) para um objeto pesado.",
          },
        ];
      case "BEHAVIORAL":
        return [
          {
            name: "Chain of Responsibility",
            description:
              "Permite passar solicitações por uma corrente de manipuladores até que um deles a processe.",
            useWhen:
              "Seu programa precisa processar diferentes tipos de pedidos de várias maneiras, mas o tipo exato de pedido é desconhecido.",
          },
          {
            name: "Command",
            description:
              "Transforma uma solicitação em um objeto independente que contém todas as informações sobre a mesma.",
            useWhen:
              "Você quer parametrizar objetos com operações, agendar execuções ou implementar o recurso de desfazer (Undo).",
          },
          {
            name: "Iterator",
            description:
              "Permite percorrer elementos de uma coleção sem expor sua representação subjacente.",
            useWhen:
              "Sua coleção tem uma estrutura complexa e você quer esconder essa complexidade por razões de segurança ou conveniência.",
          },
          {
            name: "Mediator",
            description:
              "Reduz dependências caóticas entre objetos, forçando-os a colaborar via um objeto mediador.",
            useWhen:
              "É difícil mudar algumas classes porque elas estão muito acopladas a várias outras classes.",
          },
          {
            name: "Memento",
            description:
              "Permite salvar e restaurar o estado anterior de um objeto sem revelar os detalhes da sua implementação.",
            useWhen:
              "Você precisa produzir 'retratos' (snapshots) do estado de um objeto para poder restaurá-lo se necessário.",
          },
          {
            name: "Observer",
            description:
              "Define um mecanismo de assinatura para notificar múltiplos objetos sobre eventos que acontecem.",
            useWhen:
              "Mudanças no estado de um objeto podem precisar mudar outros objetos, e o conjunto de objetos é desconhecido ou dinâmico.",
          },
          {
            name: "State",
            description:
              "Permite que um objeto altere seu comportamento quando seu estado interno muda.",
            useWhen:
              "Você tem um objeto que se comporta de maneira diferente dependendo do seu estado atual e o número de estados é grande.",
          },
          {
            name: "Strategy",
            description:
              "Define uma família de algoritmos e os torna intercambiáveis em tempo de execução.",
            useWhen:
              "Você quer usar diferentes variantes de um algoritmo dentro de um objeto e ser capaz de trocar essas variantes durante a execução.",
          },
          {
            name: "Template Method",
            description:
              "Define o esqueleto de um algoritmo na superclasse mas deixa as subclasses sobrescreverem etapas específicas.",
            useWhen:
              "Você quer permitir que os clientes estendam apenas etapas específicas de um algoritmo, mas não o algoritmo inteiro ou sua estrutura.",
          },
          {
            name: "Visitor",
            description:
              "Permite separar algoritmos dos objetos nos quais eles operam.",
            useWhen:
              "Você precisa realizar uma operação em todos os elementos de uma estrutura de objetos complexa (como uma árvore).",
          },
          {
            name: "Interpreter",
            description:
              "Define uma representação gramatical para uma linguagem e um intérprete para lidar com ela.",
            useWhen:
              "Você precisa avaliar sentenças em uma linguagem específica ou representar regras gramaticais como objetos.",
          },
        ];
    }
  }
}

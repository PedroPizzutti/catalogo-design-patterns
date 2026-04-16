import type { Pattern } from "../model/Pattern";
import type { PatternCategories } from "../model/PatternCategories";

export class PatternsFactory {
  public static create(type: PatternCategories): Pattern[] {
    switch (type) {
      case "CREATIONAL":
        return [
          {
            category: "CREATIONAL",
            name: "SINGLETON",
            description:
              "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.",
            useWhen:
              "Você precisa de um controle estrito sobre uma instância global, como em conexões de banco de dados ou logs.",
          },
          {
            category: "CREATIONAL",
            name: "FACTORY METHOD",
            description:
              "Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.",
            useWhen:
              "Você não sabe de antemão os tipos exatos e dependências dos objetos com os quais seu código deve trabalhar.",
          },
          {
            category: "CREATIONAL",
            name: "ABSTRACT FACTORY",
            description:
              "Permite produzir famílias de objetos relacionados sem especificar suas classes concretas.",
            useWhen:
              "Seu código precisa trabalhar com diversas famílias de produtos relacionados, mas não deve depender das classes concretas deles.",
          },
          {
            category: "CREATIONAL",
            name: "BUILDER",
            description:
              "Separa a construção de um objeto complexo da sua representação, permitindo diferentes configurações.",
            useWhen:
              "Você precisa criar um objeto com muitos parâmetros opcionais ou quando o processo de construção é muito complexo.",
          },
          {
            category: "CREATIONAL",
            name: "PROTOTYPE",
            description:
              "Permite copiar objetos existentes sem tornar seu código dependente de suas classes.",
            useWhen:
              "A criação de um novo objeto é mais cara ou complexa do que clonar um objeto já existente.",
          },
        ];
      case "STRUCTURAL":
        return [
          {
            category: "STRUCTURAL",
            name: "ADAPTER",
            description:
              "Permite que objetos com interfaces incompatíveis colaborem entre si.",
            useWhen:
              "Você quer usar uma classe existente, mas a interface dela não é compatível com o resto do seu código.",
          },
          {
            category: "STRUCTURAL",
            name: "BRIDGE",
            description:
              "Divide uma classe grande em duas hierarquias separadas (abstração e implementação).",
            useWhen:
              "Você quer dividir uma classe que tem várias variantes de uma funcionalidade (ex: diferentes plataformas de exibição).",
          },
          {
            category: "STRUCTURAL",
            name: "COMPOSITE",
            description:
              "Permite compor objetos em estruturas de árvores e trabalhar com elas como se fossem objetos individuais.",
            useWhen:
              "Você precisa implementar uma estrutura de objetos em árvore, como menus de interface ou sistemas de arquivos.",
          },
          {
            category: "STRUCTURAL",
            name: "DECORATOR",
            description:
              "Permite adicionar novos comportamentos a objetos dinamicamente, colocando-os dentro de invólucros.",
            useWhen:
              "Você precisa adicionar responsabilidades a objetos em tempo de execução sem quebrar o código que usa esses objetos.",
          },
          {
            category: "STRUCTURAL",
            name: "FACADE",
            description:
              "Fornece uma interface simplificada para uma biblioteca, um framework ou qualquer sistema complexo.",
            useWhen:
              "Você precisa de uma interface limitada, mas clara, para um subsistema complexo ou uma biblioteca de terceiros.",
          },
          {
            category: "STRUCTURAL",
            name: "FLYWEIGHT",
            description:
              "Permite ajustar mais objetos na quantidade disponível de memória compartilhando estados comuns.",
            useWhen:
              "Seu programa precisa gerar um número enorme de objetos e o consumo de memória está se tornando um problema.",
          },
          {
            category: "STRUCTURAL",
            name: "PROXY",
            description:
              "Fornece um substituto ou marcador de lugar para outro objeto para controlar o acesso a ele.",
            useWhen:
              "Você precisa de um controle de acesso, cache ou inicialização preguiçosa (lazy loading) para um objeto pesado.",
          },
        ];
      case "BEHAVIORAL":
        return [
          {
            category: "BEHAVIORAL",
            name: "CHAIN OF RESPONSIBILITY",
            description:
              "Encadeia múltiplos manipuladores que processam uma requisição em sequência, podendo tratá-la ou repassá-la adiante.",
            useWhen:
              "Você precisa aplicar múltiplas etapas de processamento sem acoplar quem envia a requisição a quem a processa.",
          },
          {
            category: "BEHAVIORAL",
            name: "COMMAND",
            description:
              "Transforma uma solicitação em um objeto independente que contém todas as informações sobre a mesma.",
            useWhen:
              "Você quer parametrizar objetos com operações, agendar execuções ou implementar o recurso de desfazer (Undo).",
          },
          {
            category: "BEHAVIORAL",
            name: "ITERATOR",
            description:
              "Permite percorrer elementos de uma coleção sem expor sua representação subjacente.",
            useWhen:
              "Sua coleção tem uma estrutura complexa e você quer esconder essa complexidade por razões de segurança ou conveniência.",
          },
          {
            category: "BEHAVIORAL",
            name: "MEDIATOR",
            description:
              "Reduz dependências caóticas entre objetos, forçando-os a colaborar via um objeto mediador.",
            useWhen:
              "É difícil mudar algumas classes porque elas estão muito acopladas a várias outras classes.",
          },
          {
            category: "BEHAVIORAL",
            name: "MEMENTO",
            description:
              "Permite salvar e restaurar o estado anterior de um objeto sem revelar os detalhes da sua implementação.",
            useWhen:
              "Você precisa produzir 'retratos' (snapshots) do estado de um objeto para poder restaurá-lo se necessário.",
          },
          {
            category: "BEHAVIORAL",
            name: "OBSERVER",
            description:
              "Define um mecanismo de assinatura para notificar múltiplos objetos sobre eventos que acontecem.",
            useWhen:
              "Mudanças no estado de um objeto podem precisar mudar outros objetos, e o conjunto de objetos é desconhecido ou dinâmico.",
          },
          {
            category: "BEHAVIORAL",
            name: "STATE",
            description:
              "Permite que um objeto altere seu comportamento quando seu estado interno muda.",
            useWhen:
              "Você tem um objeto que se comporta de maneira diferente dependendo do seu estado atual e o número de estados é grande.",
          },
          {
            category: "BEHAVIORAL",
            name: "STRATEGY",
            description:
              "Define uma família de algoritmos e os torna intercambiáveis em tempo de execução.",
            useWhen:
              "Você quer usar diferentes variantes de um algoritmo dentro de um objeto e ser capaz de trocar essas variantes durante a execução.",
          },
          {
            category: "BEHAVIORAL",
            name: "TEMPLATE METHOD",
            description:
              "Define o esqueleto de um algoritmo na superclasse mas deixa as subclasses sobrescreverem etapas específicas.",
            useWhen:
              "Você quer permitir que os clientes estendam apenas etapas específicas de um algoritmo, mas não o algoritmo inteiro ou sua estrutura.",
          },
          {
            category: "BEHAVIORAL",
            name: "VISITOR",
            description:
              "Permite separar algoritmos dos objetos nos quais eles operam.",
            useWhen:
              "Você precisa realizar uma operação em todos os elementos de uma estrutura de objetos complexa (como uma árvore).",
          },
          {
            category: "BEHAVIORAL",
            name: "INTERPRETER",
            description:
              "Define uma representação gramatical para uma linguagem e um intérprete para lidar com ela.",
            useWhen:
              "Você precisa avaliar sentenças em uma linguagem específica ou representar regras gramaticais como objetos.",
          },
        ];
      default:
        throw new Error("Categoria não mapeada!");
    }
  }
}

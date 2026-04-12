import type { PatternCategories } from "../model/PatternCategories";
import { PatternsFactory } from "./PatternsFactory";

export class CategoryFactory {
  public static create(type: PatternCategories) {
    let category;
    switch (type) {
      case "CREATIONAL":
        category = {
          title: "Padrões Criacionais",
          subtitle: "Creational Patterns",
          description:
            "abstraem o processo de instanciar objetos. Em vez de espalhar comandos de criação direta por todo o código, esses padrões centralizam e controlam como os objetos são formados, garantindo que o sistema permaneça independente de como seus componentes são criados, compostos e representados.",
        };
        break;
      case "STRUCTURAL":
        category = {
          type: "STRUCTURAL",
          title: "Padrões Estruturais",
          subtitle: "Structural Patterns",
          description:
            "tratam da forma como classes e objetos são organizados para compor estruturas complexas de maneira eficiente. Seu principal objetivo é reduzir o acoplamento, facilitar a reutilização e tornar o sistema mais flexível, por meio de soluções que simplificam a integração e a comunicação entre diferentes partes do software.",
        };
        break;
      case "BEHAVIORAL":
        category = {
          title: "Padrões Comportamentais",
          subtitle: "Behavioral Patterns",
          description:
            "focam nos algoritmos e na atribuição de responsabilidades entre objetos. Eles não se preocupam apenas com a conexão entre as partes, mas com o mensageiro: como a informação viaja, quem toma a decisão e como o estado do sistema evolui sem que os objetos fiquem 'dependentes' uns dos outros.",
        };
        break;
      default:
        throw new Error("Categoria não mapeada!");
    }
    return {
      ...category,
      patterns: PatternsFactory.create(type),
    };
  }
}

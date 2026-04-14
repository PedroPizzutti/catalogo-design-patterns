import { type PatternDetail } from "../model/PatternDetail";
import { ExampleFactory } from "./ExampleFactory";

export class PatternDetailFactory {
  public static create(name: string): PatternDetail {
    let detail: Omit<PatternDetail, "example">;
    switch (name) {
      case "SINGLETON":
        detail = {
          category: "CREATIONAL",
          name: "Singleton",
          problem:
            "Garantir que uma classe tenha apenas uma instância e fornecer um ponto de acesso global a ela. É aplicado quando o compartilhamento de um recurso (como um pool de conexões ou log) exige um ponto único de controle para evitar estados inconsistentes.",
          solution:
            "Torna o construtor da classe privado para impedir instanciação externa. A classe possui um atributo estático privado para armazenar a única instância e um método estático público (geralmente chamado getInstance) que cria a instância se ela não existir ou retorna a existente.",
          consequence:
            "Controle de acesso à instância única e redução do espaço de nomes. Por outro lado, pode dificultar testes unitários devido ao estado global e violar o Princípio de Responsabilidade Única, já que a classe controla seu próprio ciclo de vida.",
        };
        break;
      case "FACTORY METHOD":
        detail = {
          category: "CREATIONAL",
          name: "Factory Method",
          problem:
            "Definir uma interface para criar um objeto, mas permitir que subclasses decidam qual classe concreta instanciar. É aplicado quando uma classe não pode antecipar o tipo de objeto que deve criar ou deseja delegar essa responsabilidade para subclasses.",
          solution:
            "Define um método responsável por criar objetos (factory method), delegando a decisão da classe concreta para implementações específicas ou lógica interna baseada em parâmetros. O cliente trabalha apenas com abstrações.",
          consequence:
            "Promove baixo acoplamento ao eliminar a necessidade de instanciar classes concretas diretamente e facilita a extensão do sistema. Por outro lado, pode aumentar a complexidade ao exigir a criação de novas subclasses para cada tipo de produto.",
        };
        break;
      case "ABSTRACT FACTORY":
        detail = {
          category: "CREATIONAL",
          name: "Abstract Factory",
          problem:
            "Criar famílias de objetos relacionados garantindo que sejam compatíveis entre si. É aplicado quando diferentes variações de um sistema (como canais de notificação) exigem comportamentos consistentes entre seus componentes.",
          solution:
            "Define uma interface para criação de produtos relacionados. Cada fábrica concreta implementa essa interface retornando objetos da mesma família. O cliente utiliza apenas as abstrações, garantindo consistência sem conhecer as implementações.",
          consequence:
            "Garante consistência entre objetos relacionados e reduz o acoplamento com classes concretas. Em contrapartida, dificulta a adição de novos tipos de produtos, pois exige alteração na interface da fábrica e em todas as implementações.",
        };
        break;
      case "BUILDER":
        detail = {
          category: "CREATIONAL",
          name: "Builder",
          problem:
            "Construir objetos complexos com múltiplos parâmetros opcionais sem criar construtores com muitas variações. É aplicado quando a criação do objeto envolve várias etapas ou combinações de configuração.",
          solution:
            "Separa a construção do objeto de sua representação final. Um Builder fornece métodos encadeados para configurar o objeto passo a passo e um método final (build) que retorna a instância pronta.",
          consequence:
            "Melhora a legibilidade e flexibilidade na criação de objetos complexos. Em contrapartida, adiciona mais classes e pode ser desnecessário para objetos simples.",
        };
        break;
      case "PROTOTYPE":
        detail = {
          category: "CREATIONAL",
          name: "Prototype",
          problem:
            "Criar novos objetos copiando instâncias existentes, evitando custo de criação e acoplamento com classes concretas.",
          solution:
            "Define um método de clonagem (clone) que retorna uma cópia do objeto. Pode ser uma cópia rasa ou profunda dependendo da necessidade.",
          consequence:
            "Reduz custo de criação e evita dependência de classes concretas. Por outro lado, pode ser complexo lidar com cópias profundas.",
        };
        break;
      case "ADAPTER":
        detail = {
          category: "STRUCTURAL",
          name: "Adapter",
          problem:
            "Permitir que classes com interfaces incompatíveis trabalhem juntas. É aplicado quando se deseja reutilizar uma biblioteca de terceiro ou código legado, mas sua interface não corresponde à esperada pelo sistema.",
          solution:
            "Cria uma classe adaptadora que implementa a interface esperada pelo cliente e encapsula o objeto existente, traduzindo chamadas e dados entre os dois formatos.",
          consequence:
            "Promove reutilização e baixo acoplamento ao isolar dependências externas. Em contrapartida, adiciona uma camada extra de abstração e pode aumentar a complexidade se usado em excesso.",
        };
        break;
      case "BRIDGE":
        detail = {
          category: "STRUCTURAL",
          name: "Bridge",
          problem:
            "Evitar a explosão de subclasses quando uma abstração possui múltiplas variações independentes. É aplicado quando tanto a abstração quanto sua implementação podem evoluir separadamente.",
          solution:
            "Separa a abstração de sua implementação através de composição. A abstração mantém uma referência para um implementador, permitindo que ambas variem independentemente.",
          consequence:
            "Reduz o acoplamento e melhora a extensibilidade ao permitir combinações dinâmicas. Em contrapartida, aumenta o número de classes e pode tornar o design mais complexo inicialmente.",
        };
        break;
      default:
        throw new Error("Padrão não mapeado!");
    }
    return { ...detail, example: ExampleFactory.create(name) };
  }
}

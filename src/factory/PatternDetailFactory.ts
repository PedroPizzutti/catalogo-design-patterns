import { type PatternDetail } from "../model/PatternDetail";
import type { PatternNames } from "../model/PatternNames";
import { ExampleFactory } from "./ExampleFactory";

export class PatternDetailFactory {
  public static create(name: PatternNames): PatternDetail {
    let detail: Omit<PatternDetail, "example">;
    switch (name) {
      case "SINGLETON":
        detail = {
          category: "CREATIONAL",
          name: "SINGLETON",
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
          name: "FACTORY METHOD",
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
          name: "ABSTRACT FACTORY",
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
          name: "BUILDER",
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
          name: "PROTOTYPE",
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
          name: "ADAPTER",
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
          name: "BRIDGE",
          problem:
            "Evitar a explosão de subclasses quando uma abstração possui múltiplas variações independentes. É aplicado quando tanto a abstração quanto sua implementação podem evoluir separadamente.",
          solution:
            "Separa a abstração de sua implementação através de composição. A abstração mantém uma referência para um implementador, permitindo que ambas variem independentemente.",
          consequence:
            "Reduz o acoplamento e melhora a extensibilidade ao permitir combinações dinâmicas. Em contrapartida, aumenta o número de classes e pode tornar o design mais complexo inicialmente.",
        };
        break;
      case "COMPOSITE":
        detail = {
          category: "STRUCTURAL",
          name: "COMPOSITE",
          problem:
            "Permitir que objetos individuais e composições de objetos sejam tratados de forma uniforme. É aplicado quando há uma estrutura hierárquica em forma de árvore, como diretórios e arquivos.",
          solution:
            "Define uma interface comum para objetos simples e compostos. Objetos compostos armazenam uma coleção de elementos filhos e delegam operações a eles, permitindo que o cliente trate todos os elementos da mesma forma.",
          consequence:
            "Simplifica o código cliente ao permitir tratar objetos individuais e compostos de forma uniforme. Por outro lado, pode tornar o design mais genérico e dificultar a restrição de tipos específicos na hierarquia.",
        };
        break;
      case "DECORATOR":
        detail = {
          category: "STRUCTURAL",
          name: "DECORATOR",
          problem:
            "Adicionar responsabilidades a objetos de forma dinâmica sem modificar sua estrutura original. É aplicado quando a herança geraria uma explosão de subclasses para cada combinação de comportamentos.",
          solution:
            "Define uma interface comum e cria classes decoradoras que envolvem o objeto original, adicionando novos comportamentos antes ou depois de delegar a chamada. Isso permite combinar funcionalidades de forma flexível em tempo de execução.",
          consequence:
            "Oferece grande flexibilidade ao permitir compor comportamentos dinamicamente. Por outro lado, pode aumentar o número de classes e tornar o fluxo de execução mais difícil de entender.",
        };
        break;
      case "FACADE":
        detail = {
          category: "STRUCTURAL",
          name: "FACADE",
          problem:
            "Simplificar a interação com um subsistema complexo composto por múltiplas classes e responsabilidades. É aplicado quando o cliente precisa realizar operações comuns sem lidar diretamente com toda a complexidade interna.",
          solution:
            "Cria uma classe Facade que encapsula a lógica de interação com o subsistema, expondo métodos simples e específicos. O cliente utiliza apenas a Facade, sem precisar conhecer os detalhes das implementações internas.",
          consequence:
            "Reduz a complexidade para o cliente e diminui o acoplamento com o subsistema. Por outro lado, pode se tornar um ponto central com muitas responsabilidades se não for bem controlado.",
        };
        break;
      case "FLYWEIGHT":
        detail = {
          category: "STRUCTURAL",
          name: "FLYWEIGHT",
          problem:
            "Reduzir o consumo de memória ao lidar com um grande número de objetos semelhantes. É aplicado quando muitos objetos compartilham estados comuns e a criação individual se torna custosa.",
          solution:
            "Separa o estado intrínseco (compartilhado) do estado extrínseco (variável). Os objetos Flyweight armazenam apenas o estado compartilhado, enquanto o estado variável é fornecido externamente pelo cliente. Uma fábrica garante o reuso das instâncias existentes.",
          consequence:
            "Reduz significativamente o uso de memória ao compartilhar objetos. Em contrapartida, aumenta a complexidade ao exigir separação de estados e controle externo do estado variável.",
        };
        break;
      case "PROXY":
        detail = {
          category: "STRUCTURAL", // Padrão Estrutural
          name: "PROXY",
          problem:
            "Controlar o acesso a um objeto que pode ser caro de criar ou que precisa de regras adicionais antes de ser utilizado.",
          solution:
            "Cria um objeto proxy que implementa a mesma interface do objeto real. O proxy controla o acesso, podendo adicionar lógica como cache, validação ou inicialização preguiçosa antes de delegar a chamada ao objeto real.",
          consequence:
            "Permite adicionar controle e otimizações sem alterar o objeto original. Por outro lado, adiciona uma camada extra que pode aumentar a complexidade do sistema.",
        };
        break;
      case "CHAIN OF RESPONSIBILITY":
        detail = {
          category: "BEHAVIORAL",
          name: "CHAIN OF RESPONSIBILITY",
          problem:
            "Permitir que múltiplos objetos tenham a chance de processar uma requisição sem acoplar o remetente a um receptor específico. É aplicado quando diferentes validações ou processamentos devem ser executados em sequência.",
          solution:
            "Encadeia manipuladores que compartilham uma interface comum. Cada manipulador decide se processa a requisição ou a repassa para o próximo da cadeia.",
          consequence:
            "Reduz o acoplamento entre remetente e receptor e permite adicionar ou alterar etapas facilmente. Por outro lado, pode ser difícil garantir que a requisição será sempre tratada.",
        };
        break;
      case "COMMAND":
        detail = {
          category: "BEHAVIORAL",
          name: "COMMAND",
          problem:
            "Desacoplar quem solicita uma operação de quem a executa. É aplicado quando é necessário parametrizar ações, enfileirar requisições ou suportar operações como desfazer (undo).",
          solution:
            "Encapsula uma requisição em um objeto (Command), contendo todas as informações necessárias para sua execução. Um invoker dispara o comando, enquanto o receiver executa a lógica real.",
          consequence:
            "Permite maior flexibilidade ao desacoplar remetente e executor, além de facilitar funcionalidades como histórico e undo. Por outro lado, aumenta o número de classes no sistema.",
        };
        break;
      case "ITERATOR":
        detail = {
          category: "BEHAVIORAL",
          name: "ITERATOR",
          problem:
            "Permitir percorrer elementos de uma coleção sem expor sua estrutura interna. É aplicado quando a coleção possui uma representação complexa ou quando se deseja diferentes formas de iteração.",
          solution:
            "Define um objeto iterador responsável por acessar os elementos da coleção sequencialmente. A coleção fornece esse iterador, ocultando sua estrutura interna do cliente.",
          consequence:
            "Simplifica o acesso aos elementos e desacopla a lógica de iteração da coleção. Por outro lado, pode adicionar complexidade ao introduzir novas classes ou interfaces.",
        };
        break;
      case "MEDIATOR":
        detail = {
          category: "BEHAVIORAL",
          name: "MEDIATOR",
          problem:
            "Reduzir o acoplamento entre objetos que precisam se comunicar, evitando dependências diretas entre eles.",
          solution:
            "Introduz um objeto mediador que centraliza a comunicação entre os componentes. Em vez de se comunicarem diretamente, os objetos interagem através do mediador.",
          consequence:
            "Reduz o acoplamento entre componentes e centraliza a lógica de interação. Por outro lado, o mediador pode se tornar complexo ao concentrar muitas responsabilidades.",
        };
        break;

      case "MEMENTO":
        detail = {
          category: "BEHAVIORAL",
          name: "MEMENTO",
          problem:
            "Permitir salvar e restaurar o estado de um objeto sem violar seu encapsulamento.",
          solution:
            "Captura o estado interno de um objeto em um memento e permite restaurá-lo posteriormente. O objeto original cria e consome o memento, enquanto um caretaker armazena esses estados.",
          consequence:
            "Facilita a implementação de funcionalidades como undo e histórico. Por outro lado, pode aumentar o consumo de memória ao armazenar múltiplos estados.",
        };
        break;
      case "OBSERVER":
        detail = {
          category: "BEHAVIORAL",
          name: "OBSERVER",
          problem:
            "Permitir que múltiplos objetos sejam notificados automaticamente quando o estado de outro objeto muda.",
          solution:
            "Define uma relação de dependência onde um objeto (subject) mantém uma lista de observadores e os notifica sempre que ocorre uma mudança de estado.",
          consequence:
            "Permite comunicação desacoplada entre objetos. Por outro lado, pode dificultar o rastreamento do fluxo de execução.",
        };
        break;
      case "STATE":
        detail = {
          category: "BEHAVIORAL",
          name: "STATE",
          problem:
            "Permitir que um objeto altere seu comportamento quando seu estado interno muda, evitando o uso excessivo de condicionais.",
          solution:
            "Encapsula os diferentes estados em classes separadas, permitindo que o objeto delegue o comportamento ao estado atual.",
          consequence:
            "Elimina condicionais complexas e melhora a organização do código. Por outro lado, aumenta o número de classes no sistema.",
        };
        break;
      case "STRATEGY":
        detail = {
          category: "BEHAVIORAL",
          name: "STRATEGY",
          problem:
            "Permitir que um objeto utilize diferentes algoritmos ou comportamentos sem depender de condicionais complexas.",
          solution:
            "Define uma família de algoritmos em classes separadas e permite que sejam intercambiáveis através de uma interface comum.",
          consequence:
            "Elimina condicionais e facilita a extensão de novos comportamentos. Por outro lado, aumenta o número de classes.",
        };
        break;
      case "TEMPLATE METHOD":
        detail = {
          category: "BEHAVIORAL",
          name: "TEMPLATE METHOD",
          problem:
            "Permitir reutilizar a estrutura de um algoritmo enquanto algumas etapas podem variar entre implementações.",
          solution:
            "Define o fluxo do algoritmo em um método da classe base, delegando etapas específicas para subclasses implementarem.",
          consequence:
            "Promove reutilização e padronização de processos. Por outro lado, limita a flexibilidade ao depender de herança.",
        };
        break;
      case "VISITOR":
        detail = {
          category: "BEHAVIORAL",
          name: "VISITOR",
          problem:
            "Permitir adicionar novas operações a uma estrutura de objetos sem alterar suas classes.",
          solution:
            "Separa as operações em objetos visitantes, que são passados para os elementos da estrutura. Cada elemento aceita o visitante e delega a execução da operação.",
          consequence:
            "Facilita a adição de novas operações sem modificar as classes existentes. Por outro lado, dificulta a adição de novos tipos de elementos.",
        };
        break;
      case "INTERPRETER":
        detail = {
          category: "BEHAVIORAL",
          name: "INTERPRETER",
          problem:
            "Interpretar expressões de uma linguagem específica de forma estruturada e extensível.",
          solution:
            "Define uma representação para a gramática da linguagem e implementa um interpretador que avalia as expressões com base nessa estrutura.",
          consequence:
            "Facilita a extensão da linguagem e a adição de novas regras. Por outro lado, pode se tornar complexo para gramáticas grandes.",
        };
        break;
      default:
        throw new Error("Padrão não mapeado!");
    }
    return { ...detail, example: ExampleFactory.create(name) };
  }
}

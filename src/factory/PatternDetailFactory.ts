import { type PatternDetail } from "../model/PatternDetail";

export class PatternDetailFactory {
  public static create(name: string): PatternDetail {
    switch (name) {
      case "SINGLETON":
        return {
          category: "CREATIONAL", // Padrão de Criação

          name: "Singleton",

          problem:
            "Garantir que uma classe tenha apenas uma instância e fornecer um ponto de acesso global a ela. É aplicado quando o compartilhamento de um recurso (como um pool de conexões ou log) exige um ponto único de controle para evitar estados inconsistentes.",

          solution:
            "Torna o construtor da classe privado para impedir instanciação externa. A classe possui um atributo estático privado para armazenar a única instância e um método estático público (geralmente chamado getInstance) que cria a instância se ela não existir ou retorna a existente.",

          consequence:
            "Controle de acesso à instância única e redução do espaço de nomes. Por outro lado, pode dificultar testes unitários devido ao estado global e violar o Princípio de Responsabilidade Única, já que a classe controla seu próprio ciclo de vida.",

          example: `
public class DatabaseConfig {
    // A única instância da classe
    private static DatabaseConfig instance;
    private String connectionString;

    // 1. Construtor privado: ninguém fora da classe pode dar 'new'
    private DatabaseConfig() {
        this.connectionString = "jdbc:postgresql://localhost:5432/myapp";
    }

    // 2. Método estático público para fornecer a instância
    // 'synchronized' garante thread-safety em Java
    public static synchronized DatabaseConfig getInstance() {
        if (instance == null) {
            instance = new DatabaseConfig();
        }
        return instance;
    }

    public String getConnectionString() {
        return connectionString;
    }
}

// Exemplo de uso:
// DatabaseConfig config = DatabaseConfig.getInstance();
  `,
        };
      default:
        throw new Error("Categoria não mapeada!");
    }
  }
}

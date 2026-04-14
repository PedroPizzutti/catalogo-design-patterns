export class ExampleFactory {
  public static create(name: string): string {
    switch (name) {
      case "SINGLETON":
        return `
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

// Uso (cliente)
public class Main {
    public static void main(String[] args) {
        DatabaseConfig config = DatabaseConfig.getInstance();
    }
}
  `;
      case "FACTORY METHOD":
        return `
import java.util.ArrayList;
import java.util.List;

// Produto
interface Connection {
    void connect();
}

// Produtos Concretos
class PostgresConnection implements Connection {
    @Override
    public void connect() {
        System.out.println("Conectando ao PostgreSQL");
    }
}

class MySQLConnection implements Connection {
    @Override
    public void connect() {
        System.out.println("Conectando ao MySQL");
    }
}

// Creator (inspirado no DriverManager)
abstract class Driver {

    // Factory Method
    public abstract Connection connect(String url);
}

// Creators Concretos
class PostgresDriver extends Driver {
    @Override
    public Connection connect(String url) {
        if (url.startsWith("jdbc:postgresql:")) {
            return new PostgresConnection();
        }
        return null;
    }
}

class MySQLDriver extends Driver {
    @Override
    public Connection connect(String url) {
        if (url.startsWith("jdbc:mysql:")) {
            return new MySQLConnection();
        }
        return null;
    }
}

// Classe que orquestra (similar ao DriverManager)
class DriverManager {

    private static final List<Driver> drivers = new ArrayList<>();

    static {
        // "Registro" de drivers (simulando SPI do Java)
        drivers.add(new PostgresDriver());
        drivers.add(new MySQLDriver());
    }

    // Factory Method
    public static Connection getConnection(String url) {
        for (Driver driver : drivers) {
            Connection conn = driver.connect(url);
            if (conn != null) {
                return conn;
            }
        }
        throw new RuntimeException("Nenhum driver encontrado para URL: " + url);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/meubanco");
        conn.connect();
    }
}

  `;
      case "ABSTRACT FACTORY":
        return `
// Produtos
interface Message {
    String getContent();
}

interface Sender {
    void send(Message message);
}

// ===== Família EMAIL =====
class EmailMessage implements Message {
    @Override
    public String getContent() {
        return "Conteúdo formatado para EMAIL";
    }
}

class EmailSender implements Sender {
    @Override
    public void send(Message message) {
        System.out.println("Enviando EMAIL: " + message.getContent());
    }
}

// ===== Família SMS =====
class SmsMessage implements Message {
    @Override
    public String getContent() {
        return "Conteúdo formatado para SMS";
    }
}

class SmsSender implements Sender {
    @Override
    public void send(Message message) {
        System.out.println("Enviando SMS: " + message.getContent());
    }
}

// Abstract Factory
interface NotificationFactory {
    Message createMessage();
    Sender createSender();
}

// Fábricas concretas
class EmailFactory implements NotificationFactory {
    @Override
    public Message createMessage() {
        return new EmailMessage();
    }

    @Override
    public Sender createSender() {
        return new EmailSender();
    }
}

class SmsFactory implements NotificationFactory {
    @Override
    public Message createMessage() {
        return new SmsMessage();
    }

    @Override
    public Sender createSender() {
        return new SmsSender();
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        NotificationFactory factory;

        String type = "email";

        if (type.equalsIgnoreCase("email")) {
            factory = new EmailFactory();
        } else {
            factory = new SmsFactory();
        }

        Message message = factory.createMessage();
        Sender sender = factory.createSender();

        sender.send(message);
    }
}

  `;
      case "BUILDER":
        return `
public class User {

    private final String name;
    private final String email;
    private final int age;
    private final String address;

    // Construtor privado recebe o Builder
    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }

    // Getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }
    public String getAddress() { return address; }

    // Builder
    public static class Builder {
        private String name;
        private String email;
        private int age;
        private String address;

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setAge(int age) {
            this.age = age;
            return this;
        }

        public Builder setAddress(String address) {
            this.address = address;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        User user = new User.Builder()
                .setName("Pedro")
                .setEmail("pedro@email.com")
                .setAge(30)
                .build();

        System.out.println(user.getName());
    }
}
  `;
      case "PROTOTYPE":
        return `
public class Documento implements Cloneable {

    private String titulo;
    private String conteudo;
    private List<String> tags;

    public Documento(String titulo, String conteudo, List<String> tags) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.tags = tags;
    }

    // Clone profundo
    @Override
    public Documento clone() {
        try {
            Documento clone = (Documento) super.clone();
            clone.tags = new ArrayList<>(this.tags); // evita referência compartilhada
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }

    // Getters e setters
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public List<String> getTags() { return tags; }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Documento doc1 = new Documento(
            "Contrato",
            "Conteúdo importante",
            new ArrayList<>(List.of("juridico", "urgente"))
        );

        // Clonando
        Documento doc2 = doc1.clone();
        doc2.setTitulo("Contrato - Cópia");
        doc2.getTags().add("copia");

        System.out.println(doc1.getTitulo()); // Contrato
        System.out.println(doc2.getTitulo()); // Contrato - Cópia
    }
}
  `;
      case "ADAPTER":
        return `
// Target (interface do seu sistema)
public interface Pagamento {
    void processar(double valor);
}

// Biblioteca de terceiro (não pode alterar)
public class GatewayPagamento {
    public void checkout(int amountInCents) {
        System.out.println("Pagamento realizado: " + amountInCents + " centavos");
    }
}

// Adapter
public class PagamentoAdapter implements Pagamento {

    private GatewayPagamento lib;

    public PagamentoAdapter(GatewayPagamento lib) {
        this.lib = lib;
    }

    @Override
    public void processar(double valor) {

        // Adaptação necessária (regra de domínio)
        int centavos = (int) (valor * 100);

        lib.checkout(centavos);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        GatewayPagamento libExterna = new GatewayPagamento();

        Pagamento pagamento = new PagamentoAdapter(libExterna);

        pagamento.processar(99.90);
    }
}
  `;
      case "BRIDGE":
        return `
// Implementador (Cor)
public interface Cor {
    String aplicarCor();
}

// Implementações concretas
public class Vermelho implements Cor {
    public String aplicarCor() {
        return "vermelha";
    }
}

public class Azul implements Cor {
    public String aplicarCor() {
        return "azul";
    }
}

// Abstração (Roupa)
public abstract class Roupa {

    protected Cor cor;

    public Roupa(Cor cor) {
        this.cor = cor;
    }

    public abstract void exibir();
}

// Abstrações refinadas
public class Camiseta extends Roupa {

    public Camiseta(Cor cor) {
        super(cor);
    }

    public void exibir() {
        System.out.println("Camiseta " + cor.aplicarCor());
    }
}

public class Jaqueta extends Roupa {

    public Jaqueta(Cor cor) {
        super(cor);
    }

    public void exibir() {
        System.out.println("Jaqueta " + cor.aplicarCor());
    }
}

// Uso
public class Main {
    public static void main(String[] args) {

        Cor vermelho = new Vermelho();
        Cor azul = new Azul();

        Roupa r1 = new Camiseta(vermelho);
        Roupa r2 = new Jaqueta(azul);

        r1.exibir();
        r2.exibir();
    }
}
  `;
      default:
        throw new Error("Categoria não mapeada!");
    }
  }
}

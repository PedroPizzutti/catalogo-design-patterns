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
public interface Payment {
    void process(double value);
}

// Biblioteca de terceiro (não pode alterar)
public class GatewayPayment {
    public void checkout(int amountInCents) {
        System.out.println("Payment realizado: " + amountInCents + " centavos");
    }
}

// Adapter
public class PaymentAdapter implements Payment {

    private GatewayPayment lib;

    public PaymentAdapter(GatewayPayment lib) {
        this.lib = lib;
    }

    @Override
    public void process(double value) {

        // Adaptação necessária (regra de domínio)
        int cents = (int) (value * 100);

        lib.checkout(cents);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        GatewayPayment lib = new GatewayPayment();

        Payment Payment = new PaymentAdapter(lib);

        Payment.process(99.90);
    }
}
  `;
      case "BRIDGE":
        return `
// Implementador (Color)
public interface Color {
    String applyColor();
}

// Implementações concretas
public class Red implements Color {
    public String applyColor() {
        return "red";
    }
}

public class Blue implements Color {
    public String applyColor() {
        return "blue";
    }
}

// Abstração (Clothing)
public abstract class Clothing {

    protected Color color;

    public Clothing(Color color) {
        this.color = color;
    }

    public abstract void display();
}

// Abstrações refinadas
public class TShirt extends Clothing {

    public TShirt(Color color) {
        super(color);
    }

    @Override
    public void display() {
        System.out.println("T-Shirt " + color.applyColor());
    }
}

public class Jacket extends Clothing {

    public Jacket(Color color) {
        super(color);
    }

    @Override
    public void display() {
        System.out.println("Jacket " + color.applyColor());
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Color red = new Red();
        Color blue = new Blue();

        Clothing c1 = new TShirt(red);
        Clothing c2 = new Jacket(blue);

        c1.display();
        c2.display();
    }
}
  `;
      case "COMPOSITE":
        return `

import java.util.ArrayList;
import java.util.List;

// Componente
interface FileSystemItem {
    void showDetails();
}

// Folha (Leaf)
class File implements FileSystemItem {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void showDetails() {
        System.out.println("Arquivo: " + name);
    }
}

// Composto (Composite)
class Directory implements FileSystemItem {
    private String name;
    private List<FileSystemItem> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemItem item) {
        children.add(item);
    }

    public void remove(FileSystemItem item) {
        children.remove(item);
    }

    @Override
    public void showDetails() {
        System.out.println("Diretório: " + name);

        for (FileSystemItem item : children) {
            item.showDetails(); // delegação
        }
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        File file1 = new File("documento.txt");
        File file2 = new File("foto.png");

        Directory folder1 = new Directory("Meus Arquivos");
        folder1.add(file1);
        folder1.add(file2);

        Directory root = new Directory("Raiz");
        root.add(folder1);
        root.add(new File("leia-me.md"));

        root.showDetails();
    }
}

  `;
      case "DECORATOR":
        return `
// Componente
interface Coffee {
    String getDescription();
    double getCost();
}

// Implementação concreta (objeto base)
class SimpleCoffee implements Coffee {

    @Override
    public String getDescription() {
        return "Simple coffee";
    }

    @Override
    public double getCost() {
        return 5.0;
    }
}

// Decorador base
abstract class CoffeeDecorator implements Coffee {

    protected Coffee coffee;

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public String getDescription() {
        return coffee.getDescription();
    }

    @Override
    public double getCost() {
        return coffee.getCost();
    }
}

// Decoradores concretos
class MilkDecorator extends CoffeeDecorator {

    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", milk";
    }

    @Override
    public double getCost() {
        return coffee.getCost() + 2.0;
    }
}

class SugarDecorator extends CoffeeDecorator {

    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", sugar";
    }

    @Override
    public double getCost() {
        return coffee.getCost() + 1.0;
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Coffee coffee = new SimpleCoffee();

        // Adicionando comportamentos dinamicamente
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);

        System.out.println(coffee.getDescription());
        System.out.println("Total: $" + coffee.getCost());
    }
}

  `;
      case "FACADE":
        return `
  
  // Subsystems
class InventoryService {
    public boolean checkStock(String product) {
        System.out.println("Checking stock for: " + product);
        return true;
    }
}

class PaymentService {
    public void processPayment(String product) {
        System.out.println("Processing payment for: " + product);
    }
}

class ShippingService {
    public void shipProduct(String product) {
        System.out.println("Shipping product: " + product);
    }
}

// Facade
class OrderFacade {

    private InventoryService inventoryService = new InventoryService();
    private PaymentService paymentService = new PaymentService();
    private ShippingService shippingService = new ShippingService();

    public void placeOrder(String product) {

        if (!inventoryService.checkStock(product)) {
            System.out.println("Product out of stock");
            return;
        }

        paymentService.processPayment(product);
        shippingService.shipProduct(product);

        System.out.println("Order completed successfully");
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        OrderFacade orderFacade = new OrderFacade();
        orderFacade.placeOrder("Notebook");

    }
}

  `;
      case "FLYWEIGHT":
        return `
import java.util.HashMap;
import java.util.Map;

// Flyweight (tipo do inimigo - estado compartilhado)
class EnemyType {
    private String name;

    public EnemyType(String name) {
        this.name = name;
    }

    public void render(int x, int y) {
        System.out.println(name + " at (" + x + ", " + y + ")");
    }
}

// Factory
class EnemyFactory {
    private static final Map<String, EnemyType> types = new HashMap<>();

    public static EnemyType getEnemyType(String name) {
        if (!types.containsKey(name)) {
            types.put(name, new EnemyType(name));
        }
        return types.get(name);
    }
}

// Contexto (estado extrínseco)
class Enemy {
    private int x;
    private int y;
    private EnemyType type;

    public Enemy(int x, int y, EnemyType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void render() {
        type.render(x, y);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        // Criando vários inimigos
        for (int i = 0; i < 3; i++) {
            EnemyType goomba = EnemyFactory.getEnemyType("Goomba");
            Enemy enemy = new Enemy(i * 10, i * 5, goomba);
            enemy.render();
        }

        for (int i = 0; i < 2; i++) {
            EnemyType koopa = EnemyFactory.getEnemyType("Koopa");
            Enemy enemy = new Enemy(i * 7, i * 3, koopa);
            enemy.render();
        }

        // Verificando reuso
        EnemyType e1 = EnemyFactory.getEnemyType("Goomba");
        EnemyType e2 = EnemyFactory.getEnemyType("Goomba");

        System.out.println("Mesmo tipo? " + (e1 == e2));
    }
}

  `;
      case "PROXY":
        return `
    interface UserService {
    void getUserData(String userId);
}

// Real Subject
class UserServiceImpl implements UserService {

    @Override
    public void getUserData(String userId) {
        System.out.println("Fetching user data for: " + userId);
    }
}

// Proxy (simulando um "filter")
class UserServiceProxy implements UserService {

    private UserService userService;

    public UserServiceProxy(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void getUserData(String userId) {

        // Antes da chamada (ex: autenticação)
        if (!isAuthenticated()) {
            System.out.println("Access denied");
            return;
        }

        System.out.println("Logging request for user: " + userId);

        // Delega para o serviço real
        userService.getUserData(userId);

        // Depois da chamada
        System.out.println("Request finished");
    }

    private boolean isAuthenticated() {
        return true; // simulação
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        UserService service = new UserServiceImpl();

        // Proxy envolve o serviço real
        UserService proxy = new UserServiceProxy(service);

        proxy.getUserData("123");
    }
}
    `;
      default:
        throw new Error("Categoria não mapeada!");
    }
  }
}

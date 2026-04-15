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
      case "CHAIN OF RESPONSIBILITY":
        return `

// Handler
abstract class Handler {

    protected Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public abstract void handle(String request);
}

// Handlers concretos
class AuthHandler extends Handler {

    @Override
    public void handle(String request) {
        System.out.println("Checking authentication...");

        if (request.contains("auth")) {
            if (next != null) {
                next.handle(request);
            }
        } else {
            System.out.println("Authentication failed");
        }
    }
}

class ValidationHandler extends Handler {

    @Override
    public void handle(String request) {
        System.out.println("Validating request...");

        if (request.length() > 5) {
            if (next != null) {
                next.handle(request);
            }
        } else {
            System.out.println("Validation failed");
        }
    }
}

class BusinessHandler extends Handler {

    @Override
    public void handle(String request) {
        System.out.println("Processing business logic: " + request);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Handler auth = new AuthHandler();
        Handler validation = new ValidationHandler();
        Handler business = new BusinessHandler();

        // Montando a cadeia
        auth.setNext(validation).setNext(business);

        // Requisição
        auth.handle("auth_request_data");
    }
}

  `;
      case "COMMAND":
        return `
// Command
interface UseCase<T> {
    void execute(T input);
}

// Input
class CreateOrderInput {
    public String product;
    public int quantity;

    public CreateOrderInput(String product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }
}

// Receiver (quem executa a lógica)
class OrderService {
    public void create(String product, int quantity) {
        System.out.println("Creating order: " + product + " x" + quantity);
    }
}

// Concrete Command
class CreateOrderUseCase implements UseCase<CreateOrderInput> {

    private OrderService orderService;

    public CreateOrderUseCase(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public void execute(CreateOrderInput input) {
        orderService.create(input.product, input.quantity);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        OrderService service = new OrderService();
        UseCase<CreateOrderInput> useCase = new CreateOrderUseCase(service);

        // Executando o comando
        useCase.execute(new CreateOrderInput("Notebook", 2));
    }
}
  `;
      case "ITERATOR":
        return `
import java.util.ArrayList;
import java.util.List;

// Iterator
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Coleção
class NameCollection {

    private List<String> names = new ArrayList<>();

    public void add(String name) {
        names.add(name);
    }

    public Iterator<String> iterator() {
        return new NameIterator();
    }

    // Implementação do Iterator
    private class NameIterator implements Iterator<String> {

        private int index = 0;

        @Override
        public boolean hasNext() {
            return index < names.size();
        }

        @Override
        public String next() {
            return names.get(index++);
        }
    }
}

// Uso
public class Main {
    public static void main(String[] args) {

        NameCollection collection = new NameCollection();
        collection.add("Pedro");
        collection.add("Maria");
        collection.add("João");

        Iterator<String> iterator = collection.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
    `;
      case "MEDIATOR":
        return `
// Mediator
interface Mediator {
    void notify(Object sender, String event);
}

// Concrete Mediator
class NotificationMediator implements Mediator {

    private Logger logger;
    private EmailService emailService;

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void notify(Object sender, String event) {

        if (event.equals("USER_CREATED")) {
            logger.log("User created");
            emailService.send("Welcome email");
        }
    }
}

// Colleague
class UserService {

    private Mediator mediator;

    public UserService(Mediator mediator) {
        this.mediator = mediator;
    }

    public void createUser() {
        System.out.println("User created");
        mediator.notify(this, "USER_CREATED");
    }
}

class Logger {

    public void log(String message) {
        System.out.println("Log: " + message);
    }
}

class EmailService {

    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        NotificationMediator mediator = new NotificationMediator();

        Logger logger = new Logger();
        EmailService email = new EmailService();

        mediator.setLogger(logger);
        mediator.setEmailService(email);

        UserService userService = new UserService(mediator);

        userService.createUser();
    }
}

  `;
      case "MEMENTO":
        return `
// Memento
class EditorMemento {
    private final String content;

    public EditorMemento(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

// Originator
class Editor {

    private String content = "";

    public void type(String text) {
        content += text;
    }

    public String getContent() {
        return content;
    }

    public EditorMemento save() {
        return new EditorMemento(content);
    }

    public void restore(EditorMemento memento) {
        this.content = memento.getContent();
    }
}

// Caretaker
class History {
    private java.util.Stack<EditorMemento> stack = new java.util.Stack<>();

    public void push(EditorMemento memento) {
        stack.push(memento);
    }

    public EditorMemento pop() {
        return stack.pop();
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Editor editor = new Editor();
        History history = new History();

        editor.type("Hello ");
        history.push(editor.save());

        editor.type("World");
        history.push(editor.save());

        System.out.println(editor.getContent()); // Hello World

        editor.restore(history.pop());
        System.out.println(editor.getContent()); // Hello World

        editor.restore(history.pop());
        System.out.println(editor.getContent()); // Hello 
    }
}

  `;
      case "OBSERVER":
        return `
// Observer
interface Observer {
    void update(String message);
}

// Subject
class EventManager {

    private java.util.List<Observer> observers = new java.util.ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}

// Concrete Observers
class EmailListener implements Observer {

    @Override
    public void update(String message) {
        System.out.println("Email received: " + message);
    }
}

class LogListener implements Observer {

    @Override
    public void update(String message) {
        System.out.println("Log: " + message);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        EventManager manager = new EventManager();

        manager.subscribe(new EmailListener());
        manager.subscribe(new LogListener());

        // Dispara evento
        manager.notifyObservers("User created");
    }
}
  `;
      case "STATE":
        return `
// State
interface State {
    void handle(Document document);
}

// Concrete States
class DraftState implements State {

    @Override
    public void handle(Document document) {
        System.out.println("Document moved to review");
        document.setState(new ReviewState());
    }
}

class ReviewState implements State {

    @Override
    public void handle(Document document) {
        System.out.println("Document approved and published");
        document.setState(new PublishedState());
    }
}

class PublishedState implements State {

    @Override
    public void handle(Document document) {
        System.out.println("Document is already published");
    }
}

// Context
class Document {

    private State state;

    public Document() {
        this.state = new DraftState();
    }

    public void setState(State state) {
        this.state = state;
    }

    public void next() {
        state.handle(this);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Document doc = new Document();

        doc.next(); // Draft → Review
        doc.next(); // Review → Published
        doc.next(); // Já publicado
    }
}
  `;
      case "STRATEGY":
        return `

// Strategy
interface DiscountStrategy {
    double apply(double value);
}

// Concrete Strategies
class NoDiscount implements DiscountStrategy {

    @Override
    public double apply(double value) {
        return value;
    }
}

class TenPercentDiscount implements DiscountStrategy {

    @Override
    public double apply(double value) {
        return value * 0.9;
    }
}

class TwentyPercentDiscount implements DiscountStrategy {

    @Override
    public double apply(double value) {
        return value * 0.8;
    }
}

// Context
class ShoppingCart {

    private DiscountStrategy strategy;

    public void setStrategy(DiscountStrategy strategy) {
        this.strategy = strategy;
    }

    public double checkout(double value) {
        return strategy.apply(value);
    }
}

// Uso
public class Main {
    public static void main(String[] args) {

        ShoppingCart cart = new ShoppingCart();

        cart.setStrategy(new NoDiscount());
        System.out.println(cart.checkout(100)); // 100

        cart.setStrategy(new TenPercentDiscount());
        System.out.println(cart.checkout(100)); // 90

        cart.setStrategy(new TwentyPercentDiscount());
        System.out.println(cart.checkout(100)); // 80
    }
}
  `;
      case "TEMPLATE METHOD":
        return `
// Abstract Class
abstract class DataProcessor {

    // Template Method (define o fluxo)
    public final void process() {
        readData();
        processData();
        saveData();
    }

    protected abstract void readData();
    protected abstract void processData();

    // Implementação padrão
    protected void saveData() {
        System.out.println("Saving data...");
    }
}

// Concrete Class
class CSVProcessor extends DataProcessor {

    @Override
    protected void readData() {
        System.out.println("Reading CSV file");
    }

    @Override
    protected void processData() {
        System.out.println("Processing CSV data");
    }
}

// Outra implementação
class JSONProcessor extends DataProcessor {

    @Override
    protected void readData() {
        System.out.println("Reading JSON file");
    }

    @Override
    protected void processData() {
        System.out.println("Processing JSON data");
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        DataProcessor csv = new CSVProcessor();
        csv.process();

        System.out.println("---");

        DataProcessor json = new JSONProcessor();
        json.process();
    }
}
  `;
      case "VISITOR":
        return `
// Visitor
interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}

// Element
interface Shape {
    void accept(ShapeVisitor visitor);
}

// Concrete Elements
class Circle implements Shape {

    public double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

class Rectangle implements Shape {

    public double width;
    public double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

// Concrete Visitor
class AreaCalculator implements ShapeVisitor {

    @Override
    public void visit(Circle circle) {
        double area = Math.PI * circle.radius * circle.radius;
        System.out.println("Circle area: " + area);
    }

    @Override
    public void visit(Rectangle rectangle) {
        double area = rectangle.width * rectangle.height;
        System.out.println("Rectangle area: " + area);
    }
}

// Outro Visitor
class DescriptionVisitor implements ShapeVisitor {

    @Override
    public void visit(Circle circle) {
        System.out.println("Circle with radius " + circle.radius);
    }

    @Override
    public void visit(Rectangle rectangle) {
        System.out.println("Rectangle " + rectangle.width + "x" + rectangle.height);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Shape[] shapes = {
            new Circle(2),
            new Rectangle(3, 4)
        };

        ShapeVisitor area = new AreaCalculator();
        ShapeVisitor description = new DescriptionVisitor();

        for (Shape shape : shapes) {
            shape.accept(area);
            shape.accept(description);
        }
    }
}

  `;
      case "INTERPRETER":
        return `

// Expression
interface Expression {
    boolean interpret(String context);
}

// Terminal Expression
class ContainsExpression implements Expression {

    private String word;

    public ContainsExpression(String word) {
        this.word = word;
    }

    @Override
    public boolean interpret(String context) {
        return context.contains(word);
    }
}

// Non-terminal Expression
class AndExpression implements Expression {

    private Expression left;
    private Expression right;

    public AndExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(String context) {
        return left.interpret(context) && right.interpret(context);
    }
}

// Uso (cliente)
public class Main {
    public static void main(String[] args) {

        Expression hasJava = new ContainsExpression("Java");
        Expression hasBackend = new ContainsExpression("Backend");

        Expression rule = new AndExpression(hasJava, hasBackend);

        String text = "Java Backend Developer";

        System.out.println(rule.interpret(text)); // true
    }
}

  `;
      default:
        throw new Error("Categoria não mapeada!");
    }
  }
}

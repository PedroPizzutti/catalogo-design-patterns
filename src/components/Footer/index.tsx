export function Footer() {
  return (
    <footer className="flex flex-col text-center md:flex-row md:justify-center m-3">
      <p>&copy; {new Date().getFullYear()} Pizzutti Desenvolvimentos.</p>
      <p className="md:ml-1">
        Projeto educacional sobre o livro{" "}
        <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>.
      </p>
    </footer>
  );
}

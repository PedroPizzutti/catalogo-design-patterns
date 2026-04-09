export function Footer() {
  return (
    <footer className="flex flex-col text-center md:flex-row md:justify-center m-3">
      <p>&copy; {new Date().getFullYear()} Pizzutti Design Patterns.</p>
      <p className="md:ml-1">Projeto educacional.</p>
    </footer>
  );
}

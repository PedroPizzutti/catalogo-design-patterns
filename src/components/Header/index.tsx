import { Link, useLocation } from "react-router-dom"; // 1. Importe o hook

export function Header() {
  const location = useLocation();

  const links = [
    { name: "Criacionais", to: "/categoria/criacionais" },
    { name: "Estruturais", to: "/categoria/estruturais" },
    { name: "Comportamentais", to: "/categoria/comportamentais" },
  ];

  return (
    <header className="w-full flex flex-col items-center m-4 pb-4">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-between md:items-center">
        <Link
          key="/"
          to="/"
          className="text-2xl md:text-left text-content drop-shadow-md leading-none mb-4 md:mb-0"
        >
          Padrões de Projeto
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 md:text-right md:gap-6">
          {links.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to !== "/" && location.pathname.startsWith(link.to));

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  rounded-md transition
                  text-2xl drop-shadow-md 
                  ${isActive ? "text-content" : "hover:text-primary-dark text-content-secondary"}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

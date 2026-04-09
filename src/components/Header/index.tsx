import { Link, useLocation } from "react-router-dom"; // 1. Importe o hook

export function Header() {
  const location = useLocation();

  const links = [
    { name: "Criacionais", to: "/criacionais" },
    { name: "Estruturais", to: "/estruturais" },
    { name: "Comportamentais", to: "/comportamentais" },
  ];

  return (
    <header className="flex flex-col md:flex-row md:justify-center m-3">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 md:mr-6 drop-shadow-md"></div>

      <div className="w-full md:w-auto flex flex-col items-center md:items-start">
        <nav className="flex flex-wrap justify-center md:gap-4 mt-2">
          {links.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to !== "/" && location.pathname.startsWith(link.to));

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-2 py-1 rounded-md transition 
                  text-2xl md:text-2xl drop-shadow-md 
                  ${isActive ? "text-primary" : "hover:text-primary-dark text-content-secondary"}
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

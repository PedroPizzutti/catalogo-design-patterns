import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PatternDetailFactory } from "../../factory/PatternDetailFactory";

export function PatternDetail() {
  const { pattern } = useParams();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  try {
    const detail = PatternDetailFactory.create(pattern!.toUpperCase());
    return (
      <div className="max-w-6xl mx-auto bg-surface border border-border rounded-lg shadow-sm overflow-hidden">
        <header className="p-6 text-primary">
          <h1 className="text-3xl font-bold tracking-tight">{detail.name}</h1>
          <p className="text-sm opacity-80 mt-1 uppercase tracking-wider">
            {detail.category}
          </p>
        </header>

        <main className="p-8 space-y-8">
          <div className="grid gap-6">
            <section>
              <h2 className="text-primary-dark font-bold text-lg mb-1">
                O Problema
              </h2>
              <p className="text-content">{detail.problem}</p>
            </section>

            <section>
              <h2 className="text-primary-dark font-bold text-lg mb-1">
                A Solução
              </h2>
              <p className="text-content">{detail.solution}</p>
            </section>

            <section>
              <h2 className="text-primary-dark font-bold text-lg mb-1">
                As Consequências
              </h2>
              <p className="text-content">{detail.consequence}</p>
            </section>
          </div>

          {/* Bloco de Código - Minimalista */}
          <section>
            <h2 className="text-primary-dark font-bold text-lg mb-4">
              Exemplo de implementação
            </h2>
            <div className="bg-primary-dark rounded-md p-5 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed text-surface bg-transparent">
                <code className="language-java bg-transparent">
                  {detail.example}
                </code>
              </pre>
            </div>
          </section>
        </main>
      </div>
    );
  } catch (error) {
    return <Navigate to="/inicio" replace />;
  }
}

export default PatternDetail;

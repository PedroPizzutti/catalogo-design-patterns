import { Link } from "react-router-dom";
import type { Pattern } from "../../model/Pattern";
import { getPatternUrl } from "../../model/PatternCategories";

interface Props {
  pattern: Pattern;
}

export function Card({ pattern }: Props) {
  return (
    <Link
      to={`/categoria/${getPatternUrl(pattern.category)}/pattern/${pattern.name}`}
      className="group w-full max-w-[360px] h-[275px] flex flex-col bg-surface border border-border rounded-lg p-8 transition-all hover:border-primary cursor-pointer"
    >
      <h3 className="text-xl font-medium text-primary-dark tracking-tight mb-4">
        {pattern.name}
      </h3>

      <div className="flex-1">
        <p className="text-sm leading-relaxed text-content line-clamp-5">
          {pattern.description}
        </p>
      </div>

      <footer className="mt-1">
        <span className="block text-[10px] uppercase tracking-widest text-content mb-2 opacity-60">
          Use Quando
        </span>
        <p className="text-xs text-content leading-snug italic">
          {pattern.useWhen}
        </p>
      </footer>
    </Link>
  );
}

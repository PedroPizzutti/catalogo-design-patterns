import { Navigate, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import type { Category } from "../../model/Category";
import { CategoryFactory } from "../../factory/CategoryFactory";
import type { PatternCategories } from "../../model/PatternCategories";

export function Category() {
  const { type } = useParams();
  try {
    const category = CategoryFactory.create(type as PatternCategories);
    return (
      <Page title={category.title}>
        <section className="mx-auto px-6 py-10 space-y-3">
          <header>
            <p>
              <em>
                <strong className="text-xl">{category.subtitle}</strong>
              </em>{" "}
              {category.description}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center mx-auto">
            {category.patterns.map((pattern) => (
              <Card key={pattern.name} pattern={pattern} />
            ))}
          </div>
        </section>
      </Page>
    );
  } catch (error) {
    return <Navigate to="/inicio" replace />;
  }
}

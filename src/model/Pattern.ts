import type { PatternCategories } from "./PatternCategories";
import type { PatternNames } from "./PatternNames";

export type Pattern = {
  category: PatternCategories;
  name: PatternNames;
  description: string;
  useWhen: string;
};

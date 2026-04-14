import type { PatternCategories } from "./PatternCategories";

export type Pattern = {
  category: PatternCategories;
  name: string;
  description: string;
  useWhen: string;
};

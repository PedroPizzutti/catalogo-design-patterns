import type { PatternCategories } from "./PatternCategories";
import type { PatternNames } from "./PatternNames";

export type PatternDetail = {
  category: PatternCategories;
  name: PatternNames;
  problem: string;
  solution: string;
  consequence: string;
  example: string;
};

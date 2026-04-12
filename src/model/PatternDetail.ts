import type { PatternCategories } from "./PatternCategories";

export type PatternDetail = {
  category: PatternCategories;
  name: string;
  problem: string;
  solution: string;
  consequence: string;
  example: string;
};

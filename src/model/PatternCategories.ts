export const PatternCategoriesInfo = {
  CREATIONAL: {
    key: "CREATIONAL",
    url: "criacionais",
  },
  STRUCTURAL: {
    key: "STRUCTURAL",
    url: "estruturais",
  },
  BEHAVIORAL: {
    key: "BEHAVIORAL",
    url: "comportamentais",
  },
};

export type PatternCategories = keyof typeof PatternCategoriesInfo;

export function getPatternCategory(url: string) {
  return Object.values(PatternCategoriesInfo).find(
    (category) => category.url === url,
  )?.key;
}

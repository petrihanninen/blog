export const themes = ['hazard', 'poster', 'blueprint', 'acid', 'riso', 'concrete'] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = 'hazard';

export const resolveTheme = (value: string | string[] | undefined): Theme => {
  const candidate = Array.isArray(value) ? value[0] : value;
  return themes.find(theme => theme === candidate) ?? defaultTheme;
};

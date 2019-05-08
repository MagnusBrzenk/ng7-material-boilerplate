import { StyleCompiler } from '@angular/compiler';

export interface ILocalStorageState {
  SiteTheme: TPermittedTheme;
  isPageAnimated: boolean;
  testKey?: string;
}

// TS apparatus to convert an array of strings to a union of string types
// See: https://stackoverflow.com/a/52085658/8620332
function stringLiteralArray<T extends string>(a: T[]) {
  return a;
}

export const permittedThemes = stringLiteralArray([
  'DEFAULT-THEME',
  'BLACK-THEME',
  'LIGHT-THEME',
  'NATURE-THEME',
  'CANDY-THEME'
]);
export type TPermittedTheme = typeof permittedThemes[number];

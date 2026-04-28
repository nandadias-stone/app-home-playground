/*
 * Auto-importa todos os SVGs do Figma em src/assets/icons/ via Vite import.meta.glob.
 * Devolve mapas { nome: url } para cada categoria (geral, menu-bottom, menu-grid).
 */

const generalGlob = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const menuBottomGlob = import.meta.glob('/src/assets/icons/menu-bottom/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const menuGridGlob = import.meta.glob('/src/assets/icons/menu-grid/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function normalize(glob: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(glob)) {
    const name = path.split('/').pop()!.replace(/\.svg$/, '');
    out[name] = url;
  }
  return out;
}

export const ICON_GENERAL = normalize(generalGlob);
export const ICON_MENU_BOTTOM = normalize(menuBottomGlob);
export const ICON_MENU_GRID = normalize(menuGridGlob);

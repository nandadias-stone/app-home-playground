import { type ComponentType, createElement } from 'react';

type WidgetModule = Record<string, unknown>;

/**
 * Recebe o resultado de `import.meta.glob('./v*.tsx', { eager: true })` de um widget
 * e devolve:
 *   - `versions`: mapa { v1: ComponentV1, v2: ComponentV2, ... }
 *   - `component`: switcher que aceita prop `version` e renderiza a versão certa
 *
 * Convenção: cada arquivo `vN.tsx` deve exportar UM componente nomeado (ex: `CardSaldoV1`).
 * O helper pega o primeiro export que seja função.
 */
export function createVersionedWidget<P extends Record<string, unknown> = Record<string, unknown>>(
  modules: Record<string, WidgetModule>,
) {
  const entries: Array<[string, ComponentType<P>]> = Object.entries(modules)
    .map(([path, mod]) => {
      const key = path.match(/(v\d+)\.tsx$/)?.[1];
      if (!key) return null;
      const Comp = Object.values(mod).find(
        (v): v is ComponentType<P> => typeof v === 'function',
      );
      return Comp ? ([key, Comp] as [string, ComponentType<P>]) : null;
    })
    .filter((x): x is [string, ComponentType<P>] => x !== null)
    .sort(([a], [b]) => {
      const numA = Number(a.replace('v', ''));
      const numB = Number(b.replace('v', ''));
      return numA - numB;
    });

  const versions = Object.fromEntries(entries) as Record<string, ComponentType<P>>;
  const firstVersion = entries[0]?.[0] ?? 'v1';

  function Switcher(props: P & { version?: string }) {
    const { version = firstVersion, ...rest } = props;
    const Comp = versions[version] ?? versions[firstVersion];
    if (!Comp) return null;
    return createElement(Comp, rest as P);
  }

  return { component: Switcher, versions };
}

/**
 * Cliente para o arquivo `playground-state.json` (servido pelo plugin Vite em GET/PUT /api/state).
 *
 * Estratégia:
 * - Mantém cache em memória do estado completo (todas as fatias)
 * - Reads são síncronos contra o cache (após o boot async)
 * - Writes atualizam o cache + agendam um PUT debounced (350ms)
 * - localStorage atua como "mirror" pra ler instantaneamente no boot enquanto o GET resolve
 * - Migração silenciosa: se o arquivo está vazio mas o localStorage tem dados, sobe pro arquivo
 *
 * Os hooks (usePlaygroundConfig, usePromotionConfig, usePlaygroundPresets) consomem
 * esse cliente em vez de localStorage direto.
 */

const ENDPOINT = '/api/state';
const MIRROR_KEY_PREFIX = 'stone-state-mirror::';
const PUT_DEBOUNCE_MS = 350;

type StateMap = Record<string, unknown>;

type Listener = (slice: unknown) => void;

let cache: StateMap = {};
let booted = false;
let bootPromise: Promise<void> | null = null;
let pendingPutTimer: ReturnType<typeof setTimeout> | null = null;
let inFlightPut: Promise<void> | null = null;
const listeners = new Map<string, Set<Listener>>();

function readMirror(key: string): unknown {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(MIRROR_KEY_PREFIX + key);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function writeMirror(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MIRROR_KEY_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignora
  }
}

/**
 * Mapa de chaves antigas (localStorage direto) → chave do arquivo.
 * Usado uma vez no boot pra migrar dados que existiam antes do arquivo.
 */
const LEGACY_LOCAL_STORAGE_KEYS: Record<string, string> = {
  'stone-playground-config-v1': 'playground.config',
  'stone-playground-presets-v1': 'playground.presets',
  'stone-promotion-v1': 'promotion',
};

function readLegacyLocalStorage(): StateMap {
  if (typeof window === 'undefined') return {};
  const out: StateMap = {};
  for (const [legacyKey, fileKey] of Object.entries(LEGACY_LOCAL_STORAGE_KEYS)) {
    try {
      const raw = window.localStorage.getItem(legacyKey);
      if (!raw) continue;
      out[fileKey] = JSON.parse(raw);
    } catch {
      // ignora
    }
  }
  return out;
}

async function fetchRemote(): Promise<StateMap> {
  try {
    const res = await fetch(ENDPOINT, { method: 'GET' });
    if (!res.ok) return {};
    const json = await res.json();
    return json && typeof json === 'object' && !Array.isArray(json) ? (json as StateMap) : {};
  } catch {
    return {};
  }
}

async function pushRemote(): Promise<void> {
  try {
    await fetch(ENDPOINT, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cache),
    });
  } catch {
    // ignora — mirror local ainda persiste
  }
}

function schedulePut() {
  if (pendingPutTimer) clearTimeout(pendingPutTimer);
  pendingPutTimer = setTimeout(() => {
    pendingPutTimer = null;
    inFlightPut = pushRemote();
  }, PUT_DEBOUNCE_MS);
}

/**
 * Garante que o cache foi populado a partir do arquivo (e migrado, se necessário).
 * Pode ser chamado várias vezes — só executa o trabalho uma vez.
 */
export async function ensureBooted(): Promise<void> {
  if (booted) return;
  if (bootPromise) return bootPromise;
  bootPromise = (async () => {
    const remote = await fetchRemote();
    if (Object.keys(remote).length > 0) {
      cache = { ...remote };
    } else {
      // Arquivo vazio: tenta migrar do localStorage legado
      const legacy = readLegacyLocalStorage();
      if (Object.keys(legacy).length > 0) {
        cache = legacy;
        // Persiste imediatamente (sem debounce) pra "selar" a migração
        await pushRemote();
      } else {
        cache = {};
      }
    }
    booted = true;
    // Notifica todos os listeners do estado boot
    for (const [key, set] of listeners.entries()) {
      const slice = cache[key];
      for (const l of set) l(slice);
    }
  })();
  return bootPromise;
}

export function readSlice<T>(key: string): T | undefined {
  // Antes do boot, tenta o mirror local
  if (!booted) {
    const mirrored = readMirror(key);
    if (mirrored !== undefined) return mirrored as T;
    return undefined;
  }
  return cache[key] as T | undefined;
}

export function writeSlice<T>(key: string, value: T): void {
  cache = { ...cache, [key]: value };
  writeMirror(key, value);
  schedulePut();
  // Notifica listeners imediatamente (otimista)
  const set = listeners.get(key);
  if (set) for (const l of set) l(value);
}

export function subscribe(key: string, listener: Listener): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);
  return () => {
    set?.delete(listener);
  };
}

/**
 * Aguarda que qualquer escrita pendente seja persistida no servidor.
 * Útil em testes.
 */
export async function flushWrites(): Promise<void> {
  if (pendingPutTimer) {
    clearTimeout(pendingPutTimer);
    pendingPutTimer = null;
    inFlightPut = pushRemote();
  }
  if (inFlightPut) await inFlightPut;
}

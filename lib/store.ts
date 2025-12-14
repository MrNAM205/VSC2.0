type KV<T> = Record<string, T>;

export function put<T>(ns: string, id: string, value: T) {
  try {
    const raw = localStorage.getItem(ns);
    const kv: KV<T> = raw ? JSON.parse(raw) : {};
    kv[id] = value;
    localStorage.setItem(ns, JSON.stringify(kv));
  } catch (e) {
    console.error("Storage Error", e);
  }
}

export function get<T>(ns: string, id: string): T | null {
  try {
    const raw = localStorage.getItem(ns);
    if (!raw) return null;
    const kv: KV<T> = JSON.parse(raw);
    return kv[id] ?? null;
  } catch (e) {
    return null;
  }
}

export function list<T>(ns: string): T[] {
  try {
    const raw = localStorage.getItem(ns);
    if (!raw) return [];
    const kv: KV<T> = JSON.parse(raw);
    return Object.values(kv).sort((a: any, b: any) => 
      (b.createdAt || 0) > (a.createdAt || 0) ? 1 : -1
    );
  } catch (e) {
    return [];
  }
}
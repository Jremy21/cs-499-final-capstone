import { InjectionToken } from '@angular/core';

/** Minimal in-memory Storage fallback for non-browser (SSR/build) contexts */
class InMemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length(): number { return this.store.size; }
  clear(): void { this.store.clear(); }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void { this.store.delete(key); }
  setItem(key: string, value: string): void { this.store.set(key, value); }
}

/** Use real localStorage in browser; fallback to in-memory on server */
export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'BROWSER_STORAGE',
  {
    providedIn: 'root',
    factory: () => {
      const hasWindow = typeof window !== 'undefined';
      const hasLocal = hasWindow && typeof window.localStorage !== 'undefined';
      return hasLocal ? window.localStorage : new InMemoryStorage();
    }
  }
);

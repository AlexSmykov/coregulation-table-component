import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  readonly #document = inject(DOCUMENT);
  readonly #storage: Storage;

  get length(): number {
    return this.#storage.length;
  }

  constructor() {
    const storage = this.#document.defaultView?.localStorage;
    if (storage) {
      this.#storage = storage;
    } else {
      this.#storage = new Storage();
      console.error('Failed to receive local storage');
    }
  }

  setItem(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.#storage.getItem(key);
  }

  key(index: number): string | null {
    return this.#storage.key(index);
  }

  removeItem(key: string): void {
    this.#storage.removeItem(key);
  }

  clear(): void {
    this.#storage.clear();
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public getItem(key: string): any {
    let item = this.storage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log('Storage error:', e.message);
    }
  }

  public setItem(key: string, value: any): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('Storage error:', e.message);
    }
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
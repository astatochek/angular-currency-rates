import { Injectable, signal } from '@angular/core';
import { TokenStatus } from '../models/token';

@Injectable({
  providedIn: 'root',
})
/**
 * Manages token status and stores token in LocalStorage on demand
 */
export class TokenService {
  status = signal<TokenStatus>('valid');

  default = 'C4EW4OhAy9OpiWCRVj9ZCBGOuVVpMgkl';
  changeToken(token: string) {
    localStorage.setItem('apikey', token);
  }

  getStored() {
    return localStorage.getItem('apikey');
  }
  constructor() {
    if (!this.getStored()) {
      this.changeToken(this.default);
    }
    // effect(() => console.log(this.status()));
  }
}

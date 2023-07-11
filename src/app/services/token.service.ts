import { effect, Injectable, signal } from '@angular/core';
import { TokenStatus } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  status = signal<TokenStatus>('invalid');

  default = 'u87cmvvQ4u6JOWRDHFJYf2zY3TwXbZoyy';
  changeToken(token: string) {
    localStorage.setItem('apikey', token);
    this.status.update(() => 'valid');
  }

  getStored() {
    return localStorage.getItem('apikey');
  }
  constructor() {
    this.changeToken(this.default);
    effect(() => console.log(this.status()));
  }
}

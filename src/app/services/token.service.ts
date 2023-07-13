import { Injectable, signal } from '@angular/core';
import { TokenStatus } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  status = signal<TokenStatus>('valid');

  default = 'slKYhBaftf2yamHcMeiBEAryaKv0B6PJ_';
  changeToken(token: string) {
    localStorage.setItem('apikey', token);
  }

  getStored() {
    return localStorage.getItem('apikey');
  }
  constructor() {
    this.changeToken(this.default);
    // effect(() => console.log(this.status()));
  }
}

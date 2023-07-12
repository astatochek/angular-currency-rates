import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token', () => {
    service.changeToken('noop');
    expect(service.getStored()).toEqual('noop');
  });

  it('status should be valid by default', () => {
    expect(service.status()).toEqual('valid');
  });
});

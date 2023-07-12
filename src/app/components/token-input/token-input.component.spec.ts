import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenInputComponent } from './token-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ApiService } from '../../services/api.service';

describe('TokenInputComponent', () => {
  let component: TokenInputComponent;
  let fixture: ComponentFixture<TokenInputComponent>;
  let tokenService: TokenService;
  let tokenServiceStub: Partial<TokenService>;
  let apiService: ApiService;
  let apiServiceStub: Partial<ApiService>;

  beforeEach(() => {
    tokenServiceStub = {
      getStored: () => {
        return 'noooooooooooooooooooooooooooooop';
      },
      changeToken: (token: string) => console.log(token),
    };
    apiServiceStub = {
      emitFormValue: (value: string) => console.log(value),
    };
    TestBed.configureTestingModule({
      declarations: [TokenInputComponent],
      providers: [
        { provider: TokenService, useValue: tokenServiceStub },
        { provider: ApiService, useValue: apiServiceStub },
      ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(TokenInputComponent);
    component = fixture.componentInstance;
    tokenService = TestBed.inject(TokenService);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should override token service method', () => {
    spyOn(tokenService, 'getStored').and.returnValue('noop');
    expect(tokenService.getStored()).toEqual('noop');
    expect(component.tokenService.getStored()).toEqual('noop');
  });

  it('input should have correct initial value', () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    const expected = tokenService.getStored() || '';
    expect(input.value).toEqual(expected);
  });

  it('should render changed value', () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    component.tokenInputValue.setValue('new value');
    fixture.detectChanges();
    expect(input.value).toEqual('new value');
  });

  it('should emit events on change value', (done: DoneFn) => {
    const validValue = '000000000000000000000000000valid';
    component.tokenInputValue.valueChanges.subscribe(() => {
      expect(component.tokenInputSignal()).toEqual(validValue);
      done();
    });
    component.tokenInputValue.setValue(validValue);
    expect(component.showError()).toBeFalse();
  });

  it('should have pattern validation', () => {
    component.tokenInputValue.setValue('INVALID<32');
    expect(component.tokenInputValue.hasError('pattern')).toBeTruthy();
    component.tokenInputValue.setValue(
      'INVALIDINVALIDINVALIDINVALIDINVALIDINVALIDINVALIDINVALID>32',
    );
    expect(component.tokenInputValue.hasError('pattern')).toBeTruthy();
    component.tokenInputValue.setValue('INVALID?');
    expect(component.tokenInputValue.hasError('pattern')).toBeTruthy();

    component.tokenInputValue.setValue('zwBrgEC1HnVBL6IsIccJU0z1T6QTDtAM');
    expect(component.tokenInputValue.hasError('pattern')).toBeFalse();
  });

  it('should have "required" validation', () => {
    component.tokenInputValue.setValue('');
    expect(component.tokenInputValue.hasError('required')).toBeTruthy();
    component.tokenInputValue.setValue('_');
    expect(component.tokenInputValue.hasError('required')).toBeFalse();
  });
});

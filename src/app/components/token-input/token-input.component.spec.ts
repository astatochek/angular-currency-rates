import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TokenInputComponent } from './token-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ApiService } from '../../services/api.service';

describe('TokenInputComponent', () => {
  let component: TokenInputComponent;
  let fixture: ComponentFixture<TokenInputComponent>;
  let tokenService: TokenService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenInputComponent],
      providers: [TokenService, ApiService],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(TokenInputComponent);
    component = fixture.componentInstance;
    const de = fixture.debugElement;
    tokenService = de.injector.get(TokenService);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render new input value', () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    component.tokenInputValue.setValue('noop');
    fixture.detectChanges();
    expect(input.value).toEqual('noop');
  });

  it('should emit value on init', () => {
    spyOn(apiService, 'emitFormValue');
    component.ngOnInit();
    expect(apiService.emitFormValue).toHaveBeenCalled();
  });

  it('should emit events on change value', fakeAsync(() => {
    const validValue = '000000000000000000000000000valid';
    component.tokenInputValue.setValue(validValue);
    spyOn(tokenService, 'changeToken');
    spyOn(apiService, 'emitFormValue');
    fixture.detectChanges();
    tick(1);
    expect(component.tokenInputSignal()).toEqual(validValue);
    expect(tokenService.changeToken).toHaveBeenCalledWith(validValue);
    expect(apiService.emitFormValue).toHaveBeenCalledWith(validValue);
    expect(component.showError()).toBeFalse();
  }));

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

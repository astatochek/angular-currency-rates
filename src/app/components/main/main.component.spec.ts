import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { CardComponent } from '../card/card.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { TokenInputComponent } from '../token-input/token-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RateComponent } from '../rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyList, CurrencyMask } from '../../models/currency';
import { signal } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        CardComponent,
        DropdownComponent,
        TokenInputComponent,
        RateComponent,
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially render a fixed amount of cards', () => {
    expect(component.displayed().length).toEqual(
      component.numInitiallyDisplayed,
    );
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-card')
        .length,
    ).toEqual(component.numInitiallyDisplayed);
  });

  it('should reflect changing number of cards', () => {
    component.mask.set(
      CurrencyList.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as CurrencyMask),
    );
    expect(component.displayed().length).toEqual(CurrencyList.length);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-card')
        .length,
    ).toEqual(CurrencyList.length);
  });

  it('should add card when dropdown clicked', () => {
    const plus = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    ) as HTMLButtonElement;
    plus.click();
    fixture.detectChanges();
    const dropdownItem = plus.querySelector('button') as HTMLButtonElement;
    dropdownItem.click();
    fixture.detectChanges();
    expect(component.displayed().length).toEqual(
      component.numInitiallyDisplayed + 1,
    );
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-card')
        .length,
    ).toEqual(component.numInitiallyDisplayed + 1);
  });

  it('should render grid if valid token', () => {
    component.tokenStatus = signal('valid');
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-card')
        .length > 0,
    ).toBeTruthy();
  });

  it('plus should be clickable when token is valid', () => {
    component.tokenStatus = signal('valid');
    const plus = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    plus.click();
    fixture.detectChanges();
    expect(plus.querySelector('app-dropdown')).toBeTruthy();
  });

  it('should not render grid if invalid token', () => {
    component.tokenStatus = signal('invalid');
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-card')
        .length > 0,
    ).toBeFalse();
  });

  it('plus should not be clickable when token is invalid', () => {
    component.tokenStatus = signal('invalid');
    const plus = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    plus.click();
    fixture.detectChanges();
    expect(plus.querySelector('app-dropdown')).toBeFalsy();
  });

  it('plus should not be clickable when there is nothing to show', () => {
    component.mask.set(
      CurrencyList.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as CurrencyMask),
    );
    const plus = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    plus.click();
    fixture.detectChanges();
    expect(plus.querySelector('app-dropdown')).toBeFalsy();
  });
});

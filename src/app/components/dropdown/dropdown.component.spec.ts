import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { signal } from '@angular/core';
import { CurrencyList, CurrencyMask } from '../../models/currency';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    });
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.mask = signal(
      CurrencyList.reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as CurrencyMask),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input changes', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    const n = htmlElement.querySelectorAll('button').length;
    component.mask.mutate((next) => (next['USD'] = true));
    fixture.detectChanges();
    expect(htmlElement.querySelectorAll('button').length).toEqual(n - 1);
  });

  it('should reflect display method call', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const n = htmlElement.querySelectorAll('button').length;
    component.displayCurrency('USD');
    fixture.detectChanges();
    expect(htmlElement.querySelectorAll('button').length).toEqual(n - 1);
  });

  it('should handle click', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    const n = htmlElement.querySelectorAll('button').length;
    const button = htmlElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(htmlElement.querySelectorAll('button').length).toEqual(n - 1);
  });
});

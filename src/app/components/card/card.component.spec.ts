import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {
  CurrencyInfo,
  CurrencyList,
  SourceCurrency,
} from '../../models/currency';
import { _prev, _next } from '../../dummies/data';
import { RateComponent } from '../rate/rate.component';
import { CurrencyService } from '../../services/currency.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';

const info = CurrencyList.reduce((acc, key) => {
  acc[key] = {
    prev: 1 / _prev.quotes[`${SourceCurrency}${key}`],
    next: 1 / _next.quotes[`${SourceCurrency}${key}`],
  };
  return acc;
}, {} as CurrencyInfo);

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let currencyService: CurrencyService;
  let currencyServiceStub: Partial<CurrencyService>;

  beforeEach(() => {
    currencyServiceStub = {
      info: signal(info),
    };

    TestBed.configureTestingModule({
      declarations: [CardComponent, RateComponent],
      providers: [
        {
          provide: CurrencyService,
          useValue: currencyServiceStub,
        },
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.currency = 'EUR';
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('info should be default', () => {
    expect(currencyService.info()).toEqual(info);
  });

  it('should render next value correctly', () => {
    component.value = signal({ prev: 100, next: 123.45 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const strong = htmlElement.querySelector('strong') as HTMLElement;
    expect(strong.textContent).toContain('123.45');
  });

  it('should render prev value correctly', () => {
    component.value = signal({ prev: 100, next: 123.45 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const small = htmlElement.querySelector('small') as HTMLElement;
    expect(small.textContent).toContain('100.00');
  });

  it('should render rate', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    expect(htmlElement.querySelector('app-rate')).toBeTruthy();
  });
});

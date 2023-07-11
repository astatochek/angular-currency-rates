import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyList, CurrencyMask } from '../../models/currency';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  private currencyService = inject(CurrencyService);
  private tokenService = inject(TokenService);

  tokenStatus = computed(() => this.tokenService.status());

  date = computed(() => this.currencyService.date());

  numInitiallyDisplayed = 3; // first 3 are: USD, EUR, GBR

  mask = signal<CurrencyMask>(
    CurrencyList.reduce((acc, currency, index) => {
      acc[currency] = index < this.numInitiallyDisplayed;
      return acc;
    }, {} as CurrencyMask),
  );

  prevKeys = CurrencyList.filter((key) => this.mask()[key]);

  displayed = computed(() => {
    const newKeys = CurrencyList.filter((key) => this.mask()[key]);
    const difference = newKeys.filter((key) => !this.prevKeys.includes(key));
    const res = difference.concat(this.prevKeys);
    this.prevKeys = res;
    return res;
  });

  isShowingCurrencyDropdown = signal(false);

  handleDropdownButtonCLick() {
    const numItemsLeft = CurrencyList.reduce((acc, key) => {
      acc += Number(!this.mask()[key]);
      return acc;
    }, 0);
    if (numItemsLeft === 0 || this.tokenStatus() === 'invalid') {
      this.isShowingCurrencyDropdown.update(() => false);
      return;
    }
    this.isShowingCurrencyDropdown.update((prev) => !prev);
  }
}

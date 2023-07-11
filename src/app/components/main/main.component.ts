import {Component, computed, inject, signal} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {CurrencyList, CurrencyMask} from "../../models/currency";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  private currencyService = inject(CurrencyService)

  date = computed(() => this.currencyService.date())

  mask = signal<CurrencyMask>(CurrencyList.reduce((acc, currency, index) => {
    acc[currency] = index < 3; // first 3 are: USD, EUR, GBR
    return acc;
  }, {} as CurrencyMask))

  displayed = computed(
    () => CurrencyList.filter(key => this.mask()[key])
  )

  isShowingCurrencyDropdown = signal(false)

  handleDropdownButtonCLick() {
    const numItemsLeft = CurrencyList.reduce((acc, key) => {
      acc += Number(!this.mask()[key])
      return acc
    }, 0)
    if (numItemsLeft === 0) {
      this.isShowingCurrencyDropdown.update(() => false)
      return
    }
    this.isShowingCurrencyDropdown.update(prev => !prev)
  }

}

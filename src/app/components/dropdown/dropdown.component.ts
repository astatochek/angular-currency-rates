import { Component, computed, Input, WritableSignal } from '@angular/core';
import { Currency, CurrencyList, CurrencyMask } from '../../models/currency';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [],
})
export class DropdownComponent {
  @Input() mask!: WritableSignal<CurrencyMask>;

  available = computed(() => CurrencyList.filter((key) => !this.mask()[key]));

  displayCurrency(key: Currency) {
    this.mask.mutate((prev) => (prev[key] = true));
  }
}

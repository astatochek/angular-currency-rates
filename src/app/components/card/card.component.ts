import { Component, computed, inject, Input } from '@angular/core';
import { Currency } from '../../models/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [],
})
export class CardComponent {
  @Input() currency!: Currency;

  private currencyService = inject(CurrencyService);

  value = computed(() => this.currencyService.info()[this.currency]);
}

import { Component, computed, Input, OnChanges, signal } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: [],
})
export class RateComponent implements OnChanges {
  @Input() rate!: number;

  value = signal(0);
  arrow = signal<'up' | 'down' | 'none'>('none');

  styles = computed(() => {
    switch (this.arrow()) {
      case 'none':
        return ['bg-anti-flash-white', 'text-auro-metal-saurus'];
      case 'up':
        return ['bg-misty-rose', 'text-ruby-red'];
      case 'down':
        return ['bg-nyanza', 'text-dark-spring-green'];
    }
    return [];
  });

  ngOnChanges() {
    this.value.update(() => Math.abs(this.rate));
    if (this.rate < 0) {
      this.arrow.update(() => 'down');
    } else if (this.rate > 0) {
      this.arrow.update(() => 'up');
    } else {
      this.arrow.update(() => 'none');
    }
  }
}

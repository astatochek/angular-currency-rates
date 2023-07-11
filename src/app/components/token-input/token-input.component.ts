import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-token-input',
  templateUrl: './token-input.component.html',
  styleUrls: ['./token-input.component.css'],
})
export class TokenInputComponent {
  private tokenService = inject(TokenService);
  default!: string;

  constructor() {
    const stored = this.tokenService.getStored();
    this.default = stored ? stored : this.tokenService.default;
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.tokenService.changeToken(value);
    console.log(value);
  }
}

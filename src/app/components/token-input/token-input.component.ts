import { Component, effect, inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-token-input',
  templateUrl: './token-input.component.html',
  styleUrls: [],
})
export class TokenInputComponent {
  tokenService = inject(TokenService);
  private apiService = inject(ApiService);

  stored = this.tokenService.getStored();

  flag: boolean | undefined = undefined;
  info: any = undefined;

  tokenInputValue = new FormControl(
    this.stored ? this.stored : this.tokenService.default,
    [Validators.required, Validators.pattern('[A-Za-z0-9]{32}')],
  );

  tokenInputSignal = toSignal(this.tokenInputValue.valueChanges);

  showError() {
    return this.tokenInputValue.invalid && this.tokenInputValue.dirty;
  }

  constructor() {
    effect(() => {
      const value = this.tokenInputSignal();
      const errors = this.tokenInputValue.errors;
      this.flag = errors === null && value !== null && value !== undefined;
      this.info = {
        value,
        errors,
      };
      if (errors === null && value !== null && value !== undefined) {
        this.flag = true;
        console.log('Valid Value:', value);
        this.tokenService.changeToken(value);
        this.apiService.emitFormValue(value);
      }
    });
  }
}

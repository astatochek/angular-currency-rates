import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-token-input',
  templateUrl: './token-input.component.html',
  styleUrls: ['./token-input.component.css'],
})
export class TokenInputComponent implements OnInit {
  private tokenService = inject(TokenService);
  private apiService = inject(ApiService);

  stored = this.tokenService.getStored();

  destroyRef = inject(DestroyRef);
  destroyed = new Subject<void>();

  tokenInputValue = new FormControl(
    this.stored ? this.stored : this.tokenService.default,
    [Validators.required, Validators.pattern('[A-Za-z0-9]{32}')],
  );

  tokenInputSignal = toSignal(
    this.tokenInputValue.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ),
  );

  showError() {
    return this.tokenInputValue.invalid && this.tokenInputValue.dirty;
  }

  constructor() {
    effect(() => {
      const value = this.tokenInputSignal();
      const errors = this.tokenInputValue.errors;
      if (!errors && value) {
        this.tokenService.changeToken(value);
        this.apiService
          .sendRequest()
          .pipe(takeUntil(this.destroyed))
          .subscribe();
      }
    });
  }

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });
  }
}

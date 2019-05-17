import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route-change.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
  });

  constructor(
    private fb: FormBuilder // private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
  }

  isFormSubmittable() {
    const isError =
      (!!this.form.get('description') && !!this.form.get('description')!.hasError('required')) ||
      (!!this.form.get('description') && !!this.form.get('description')!.hasError('minlength')) ||
      (!!this.form.get('description') && !!this.form.get('description')!.hasError('maxlength')) ||
      (!!this.form.get('email') && !!this.form.get('email')!.hasError('required')) ||
      (!!this.form.get('username') && !!this.form.get('username')!.hasError('required'));
    if (isError) return false;
    return true;
  }
}

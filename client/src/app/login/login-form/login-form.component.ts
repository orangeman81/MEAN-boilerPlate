import { FormGroup, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  get username() { return this.loginForm.get('username'); };
  get email() { return this.loginForm.get('email'); };
  get password() { return this.loginForm.get('password'); };

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  constructor() { }

}

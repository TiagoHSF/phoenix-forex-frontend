import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  autenticado = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.autenticado = true;
    if (this.loginForm.get("email")?.value == "phoenix@forex.com" && this.loginForm.get("password")?.value == "obforex") {
      this.autenticado = true;
    }

    if (this.loginForm.get("email")?.value == "phoenix2@forex.com" && this.loginForm.get("password")?.value == "obforex") {
      this.autenticado = true;
    }
  }

}

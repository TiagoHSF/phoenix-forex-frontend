import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  autenticado = false;

  loginForm: FormGroup;

  tipoTrader = "";

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem("tkn");
    if (token?.includes("QGdtYWlsLmNvbSIsImJhc2UiOiJ") && token.includes("WN1cml0eVByb2Nlc3MiLCJmb3JleCI6IlZhbGlkYcOnw6NvIGZvcmV4IG9iIn0") && token.includes("eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiZm9yZXhmY")) {
      this.autenticado = true;
    }
    if (token?.includes("QmFzZTIwMjUiLCJzZWN1cml0eSI6IkhhcmRTZWN1cml0eVB") && token.includes("leCI6IlZhbGlkYc") && token.includes("eyJhbGciOiJIUzI1NiJ9.MjU2In0.e30.yDQwjH83001DU5uf5ZPsHbHyrate0r0XOeO_RxfLMi0")) {
      this.autenticado = true;
    }
  }

  login() {
    if (this.loginForm.get("email")?.value == "phoenix073628@gmail.com" && this.loginForm.get("password")?.value == "farm2025") {
      //INICIAL
      this.tipoTrader = "MODERADO";
      localStorage.setItem("tkn", "eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiZm9yZXhmYXJtQGdtYWlsLmNvbSIsImJhc2UiOiJjb2RlQmFzZTIwMjUiLCJzZWN1cml0eSI6IkhhcmRTZWN1cml0eVByb2Nlc3MiLCJmb3JleCI6IlZhbGlkYcOnw6NvIGZvcmV4IG9iIn0.UcVfKYOSdx2fHCVxH6LbXYiGn9ze-nPLhW9c_U-H4Ps");
      this.autenticado = true;
    }

    if (this.loginForm.get("email")?.value == "phoenix05736@gmail.com" && this.loginForm.get("password")?.value == "farm2025") {
      //INICIAL
      this.tipoTrader = "MODERADO";
      localStorage.setItem("tkn", "eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiZm9yZXhmYXJtQGdtYWlsLmNvbSIsImJhc2UiOiJjb2RlQmFzZTIwMjUiLCJzZWN1cml0eSI6IkhhcmRTZWN1cml0eVByb2Nlc3MiLCJmb3JleCI6IlZhbGlkYcOnw6NvIGZvcmV4IG9iIn0.UcVfKYOSdx2fHCVxH6LbXYiGn9ze-nPLhW9c_U-H4Ps");
      this.autenticado = true;
    }

    if (this.loginForm.get("email")?.value == "phoenixagress098@gmail.com" && this.loginForm.get("password")?.value == "farm2025") {
      //AGRESSIVO
      this.tipoTrader = "AGRESSIVO";
      localStorage.setItem("tkn", "eyJ1c3VhcmlvIjoiZm9yZXhmYXJtQGdtYWlsLmNvbSIsImJhc2UiOiJjb2RlQmFzZTIwMjUiLCJzZWN1cml0eSI6IkhhcmRTZWN1cml0eVByb2Nlc3MiLCJmb3JleCI6IlZhbGlkYcOnw6NvIGZvcmV4IG9iIiwidHlwZSI6ImFncmVzcyIsImFsZyI6IkhTMjU2In0.e30.yDQwjH83001DU5uf5ZPsHbHyrate0r0XOeO_RxfLMi0");
      this.autenticado = true;
    }

    if (this.loginForm.get("email")?.value == "phoenixagress09584@gmail.com" && this.loginForm.get("password")?.value == "farm2025") {
      //AGRESSIVO
      this.tipoTrader = "AGRESSIVO";
      localStorage.setItem("tkn", "eyJ1c3VhcmlvIjoiZm9yZXhmYXJtQGdtYWlsLmNvbSIsImJhc2UiOiJjb2RlQmFzZTIwMjUiLCJzZWN1cml0eSI6IkhhcmRTZWN1cml0eVByb2Nlc3MiLCJmb3JleCI6IlZhbGlkYcOnw6NvIGZvcmV4IG9iIiwidHlwZSI6ImFncmVzcyIsImFsZyI6IkhTMjU2In0.e30.yDQwjH83001DU5uf5ZPsHbHyrate0r0XOeO_RxfLMi0");
      this.autenticado = true;
    }
  }

  get desabilitar() {
    if (this.loginForm.invalid) {
      return true;
    }
    return false;
  }

}

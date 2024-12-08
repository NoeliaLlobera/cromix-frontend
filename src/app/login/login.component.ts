import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IloginModel} from "./models/login.model";
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = '';
  btnSubmitText = '';
  form!: FormGroup;
  mode: 'login' | 'register' = 'login';
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly service: LoginService = inject(LoginService);


  constructor() {
    this.title = this.route.snapshot.title || '';
    this.title === 'login.title' ? this.mode = 'login' : this.mode = 'register';

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    if (this.mode === 'login') {
      this.btnSubmitText = 'common.buttons.login'
    } else {
      this.btnSubmitText = 'common.buttons.register'
      this.form.addControl('confirmPassword', this.fb.control('', [Validators.required, Validators.minLength(8)]))
    }
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const loginData: IloginModel = this.form.value;
    if (this.mode === 'login') {
      await this.service.login(loginData);
    } else if (this.mode === 'register') {
      await this.service.signup(loginData);
    }

  }
}

import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IloginModel} from "./models/login.model";
import {LoginService} from "./service/login.service";
import {setGrowlMessage} from "../store/growl/growl.actions";
import {Store} from "@ngrx/store";
import {login} from "../store/login/login.actions";

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    RouterLink
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
  private readonly store: Store = inject(Store);


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
      this.store.dispatch(login({user: loginData}));
    } else if (this.mode === 'register') {
      if (loginData.password !== loginData.confirmPassword) {
        this.store.dispatch(setGrowlMessage({growl: {message: 'login.errors.pasword-match', type: 'danger'}}));
        return;
      }
      await this.service.signup(loginData);
    }
  }


}

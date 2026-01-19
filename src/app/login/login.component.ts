import { Component, inject } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IloginModel } from "./models/login.model";
import { LoginService } from "./service/login.service";
import { Store } from "@ngrx/store";
import { GrowlService } from '../core/services/growl.service';
import {LoaderComponent} from "../shared/components/loader/loader.component";

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    RouterLink,
    LoaderComponent
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
  private readonly store: Store = inject(Store);
  private readonly service: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);
  private readonly growlService: GrowlService = inject(GrowlService);
  protected isLoading: boolean = false;


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
      this.isLoading = true;
      try {
        const login = await this.service.loginAction(loginData);
        this.isLoading = false;
        this.router.navigate(['/home']).then();
      } catch (e){
        this.isLoading = false;
      }


    } else if (this.mode === 'register') {
      if (loginData.password !== loginData.confirmPassword) {
        this.growlService.setGrowlMessage({ message: 'login.errors.pasword-match', type: 'danger' });
        this.router.navigate(['/home']).then();
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      try{
        const response = await this.service.signupAction(loginData);
        this.isLoading = false;
        if(response && response.error){
          this.isLoading = false;
          return
        }
      }catch (e) {
        this.isLoading = false;
      }

      this.router.navigate(['/home']).then();
    }
  }
}

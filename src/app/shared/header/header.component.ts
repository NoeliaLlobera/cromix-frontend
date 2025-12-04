import {Component, inject, TemplateRef} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {UserDTO} from "../../core/models/UserDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {LoginService} from "../../login/service/login.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router)
  private readonly loginService: LoginService = inject(LoginService)
  startPage!: string;
  user$!: Observable<UserDTO | null>;

  constructor() {
    this.startPage = '';
    this.user$ = this.loginService.user$;
    this.startPage = 'home';
    const storedUser: string | null = localStorage.getItem('user');
    if (storedUser) {
      const user: UserDTO = JSON.parse(storedUser);
    }
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  logout() {
    localStorage.removeItem('user');
    this.loginService.logout();
    this.startPage = '';
    this.modalService.dismissAll();
  }

  home() {
    this.router.navigate(['/home']).then();
    this.modalService.dismissAll();
  }
}

import {Component, inject, TemplateRef} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {UserDTO} from "../../core/models/UserDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {selectLoginState, selectUser} from "../../store/auth/auth.selectors";
import {Observable} from "rxjs";
import {logout} from "../../store/auth/auth.actions";

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private modalService: NgbModal = inject(NgbModal);
  private store: Store = inject(Store);
  private readonly router: Router = inject(Router)
  user: UserDTO | null = null;
  startPage!: string;
  user$!: Observable<UserDTO | null>;

  constructor() {
    this.startPage = '';
    this.user$ = this.store.select(selectUser);
    this.startPage = 'home';
    this.store.select(selectLoginState).subscribe(loginState => {
      this.user = loginState.user;
      this.startPage = 'home';
    });
    const storedUser: string | null = localStorage.getItem('user');
    if (storedUser) {
      const user: UserDTO = JSON.parse(storedUser);
      this.store.dispatch({ type: '[Login Page] Localhost Login', user: user });
    }
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  logout() {
    this.store.dispatch(logout())
    this.startPage = '';
    this.modalService.dismissAll();
  }

  home() {
    this.router.navigate(['/home']).then();
    this.modalService.dismissAll();
  }
}

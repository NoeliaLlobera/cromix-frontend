import {Component, inject, TemplateRef} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {UserDTO} from "../../core/models/UserDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  private readonly auth: AuthService = inject(AuthService);
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router)
  user: UserDTO | null = null;
  startPage!: string;

  constructor() {
    this.startPage = '';
    this.auth.user$().subscribe(user => {
      this.user = user;
      this.startPage = 'home';
    });
    this.auth.startSession();
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  logout() {
    this.auth.logout();
    this.startPage = '';
    this.modalService.dismissAll();
  }

  home() {
    this.router.navigate(['/home']);
    this.modalService.dismissAll();
  }
}

import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing',
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private readonly router: Router) {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/home']).then();
    }
  }
}

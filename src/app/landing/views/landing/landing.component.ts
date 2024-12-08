import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing',
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}

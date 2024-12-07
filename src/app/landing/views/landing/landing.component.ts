import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-landing',
  imports: [
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}

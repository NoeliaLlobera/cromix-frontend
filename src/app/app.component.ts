import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateDirective, TranslatePipe, TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, TranslatePipe, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


}

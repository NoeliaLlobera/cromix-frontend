import { Component, computed, inject, Signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";
import { debounceTime, Observable, tap } from "rxjs";
import { GrowlModel } from './core/models/growl';
import { ConfigService } from "./core/services/config.service";
import { GrowlService } from './core/services/growl.service';
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, TranslatePipe, HeaderComponent],
  template: `
    <div class="container py-2">
      <header>
        @if(hasHeader()){
          <app-header></app-header>
        }
      </header>
      <main>
        <div class="d-flex justify-content-center position-relative mt-3">
          @if (growlMessage) {
            <ngb-alert #growl  [type]="growlType" (closed)="growlMessage = ''">{{ growlMessage | translate }}</ngb-alert>
          }
        </div>
        <div class="container my-4">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  @ViewChild('growl', { static: false }) selfClosingAlert!: NgbAlert;
  growlMessage: string = '';
  growlType: 'danger' | 'success' | 'warning' = 'success';

  private readonly configService: ConfigService = inject(ConfigService);
  private readonly growlService: GrowlService = inject(GrowlService);

  hasHeader: Signal<boolean> = computed(() => this.configService.hasHeader());

  constructor() {
    this.growlService.growlMessages$.pipe(
      tap((growl: GrowlModel) => {
        console.log(growl);
        this.growlMessage = growl.message;
        this.growlType = growl.type;
      }),
      debounceTime(5000),
    ).subscribe(() => {
      this.selfClosingAlert.close();
    });
  }
}

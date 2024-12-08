import {Component, inject, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbAlert, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {HeaderComponent} from "./shared/header/header.component";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {GrowlService} from "./core/services/growl.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, TranslatePipe, HeaderComponent],
  template: `
    <div class="container py-2">
      <app-header></app-header>
      <div class="d-flex justify-content-center position-relative mt-3">
        @if (growlMessage) {
          <ngb-alert #growl  [type]="growlType" (closed)="growlMessage = ''">{{ growlMessage | translate }}</ngb-alert>
        }
      </div>
      <div class="container my-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  growlMessage: string = '';
  growlType: 'danger' | 'success' | 'warning' = 'success';
  @ViewChild('growl', {static: false}) selfClosingAlert!: NgbAlert;

  private readonly growlService: GrowlService = inject(GrowlService);

  constructor() {
    this.growlService.message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.growlMessage = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());

    this.growlService.messageType$.pipe(
      takeUntilDestroyed(),
      tap((type) => (this.growlType = type))
    ).subscribe()
  }
}

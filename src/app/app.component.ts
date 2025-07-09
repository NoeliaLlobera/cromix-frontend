import {Component, computed, inject, Signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbAlert, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {HeaderComponent} from "./shared/header/header.component";
import {debounceTime, Observable, tap} from "rxjs";
import {ConfigService} from "./core/services/config.service";
import {Store} from "@ngrx/store";
import {selectGrowlMessage, selectGrowlType} from "./store/growl/growl.selectors";

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
  growlMessage: string = '';
  growlType: 'danger' | 'success' | 'warning' = 'success';
  @ViewChild('growl', {static: false}) selfClosingAlert!: NgbAlert;
  message$!: Observable<string>
  messageType$!: Observable< 'danger' | 'success' | 'warning'>
  private readonly configService: ConfigService = inject(ConfigService);
  private readonly store: Store = inject(Store);

  hasHeader: Signal<boolean> = computed(() => this.configService.hasHeader());

  constructor() {
    this.message$ = this.store.select(selectGrowlMessage);
    this.messageType$ = this.store.select(selectGrowlType);

    this.message$
      .pipe(
        tap((message) => (this.growlMessage = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());

    this.messageType$.pipe(
      tap((type: 'danger' | 'success' | 'warning'):  'danger' | 'success' | 'warning' => (this.growlType = type))
    ).subscribe()
  }
}

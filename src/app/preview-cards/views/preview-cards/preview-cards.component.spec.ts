import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCardsComponent } from './preview-cards.component';

describe('PreviewCardsComponent', () => {
  let component: PreviewCardsComponent;
  let fixture: ComponentFixture<PreviewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

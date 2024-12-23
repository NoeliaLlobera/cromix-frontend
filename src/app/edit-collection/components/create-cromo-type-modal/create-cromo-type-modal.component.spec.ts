mport { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCromoTypeModalComponent } from './create-cromo-type-modal.component';

describe('CreateCollectionModalComponent', () => {
  let component: CreateCromoTypeModalComponent;
  let fixture: ComponentFixture<CreateCromoTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCromoTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCromoTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

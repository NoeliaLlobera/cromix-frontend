import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorCollectionListComponent } from './collector-collection-list.component';

describe('CollectorCollectionListComponent', () => {
  let component: CollectorCollectionListComponent;
  let fixture: ComponentFixture<CollectorCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorCollectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

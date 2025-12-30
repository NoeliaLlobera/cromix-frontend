import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorCollectionListComponent } from './creator-collection-list.component';

describe('CreatorCollectionListComponent', () => {
  let component: CreatorCollectionListComponent;
  let fixture: ComponentFixture<CreatorCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorCollectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EditCollectionService } from './edit-collection.service';

describe('EditCollectionService', () => {
  let service: EditCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

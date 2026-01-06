import { TestBed } from '@angular/core/testing';

import { PreviewCardsService } from './preview-cards.service';

describe('PreviewCardsService', () => {
  let service: PreviewCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

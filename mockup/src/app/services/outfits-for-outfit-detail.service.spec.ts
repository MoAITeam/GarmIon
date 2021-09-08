import { TestBed } from '@angular/core/testing';

import { OutfitsForOutfitDetailService } from './outfits-for-outfit-detail.service';

describe('OutfitsForOutfitDetailService', () => {
  let service: OutfitsForOutfitDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitsForOutfitDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

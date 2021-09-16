import { TestBed } from '@angular/core/testing';

import { OutfitSaverService } from './outfit-saver.service';

describe('OutfitSaverService', () => {
  let service: OutfitSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

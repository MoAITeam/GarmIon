import { TestBed } from '@angular/core/testing';

import { OutfitCorridorService } from './outfit-corridor.service';

describe('OutfitCorridorService', () => {
  let service: OutfitCorridorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitCorridorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

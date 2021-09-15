import { TestBed } from '@angular/core/testing';

import { PreviewCorridorService } from './preview-corridor.service';

describe('PreviewCorridorService', () => {
  let service: PreviewCorridorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewCorridorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

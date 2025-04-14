import { TestBed } from '@angular/core/testing';

import { PangatBookingService } from './pangat-booking.service';

describe('PangatBookingService', () => {
  let service: PangatBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PangatBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DarshanBookingService } from './darshan-booking.service';

describe('DarshanBookingService', () => {
  let service: DarshanBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarshanBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

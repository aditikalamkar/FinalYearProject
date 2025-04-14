import { TestBed } from '@angular/core/testing';

import { PrasadBookingService } from './prasad-booking.service';

describe('PrasadBookingService', () => {
  let service: PrasadBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrasadBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

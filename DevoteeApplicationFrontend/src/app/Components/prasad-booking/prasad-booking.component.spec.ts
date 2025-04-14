import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrasadBookingComponent } from './prasad-booking.component';

describe('PrasadBookingComponent', () => {
  let component: PrasadBookingComponent;
  let fixture: ComponentFixture<PrasadBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrasadBookingComponent]
    });
    fixture = TestBed.createComponent(PrasadBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

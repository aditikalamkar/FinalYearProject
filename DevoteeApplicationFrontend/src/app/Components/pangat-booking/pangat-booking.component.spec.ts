import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangatBookingComponent } from './pangat-booking.component';

describe('PangatBookingComponent', () => {
  let component: PangatBookingComponent;
  let fixture: ComponentFixture<PangatBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PangatBookingComponent]
    });
    fixture = TestBed.createComponent(PangatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

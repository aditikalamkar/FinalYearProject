import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarshanBookingComponent } from './darshan-booking.component';

describe('DarshanBookingComponent', () => {
  let component: DarshanBookingComponent;
  let fixture: ComponentFixture<DarshanBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarshanBookingComponent]
    });
    fixture = TestBed.createComponent(DarshanBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

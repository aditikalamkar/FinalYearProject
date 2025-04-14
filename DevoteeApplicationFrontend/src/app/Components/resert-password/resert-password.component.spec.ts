import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResertPasswordComponent } from './resert-password.component';

describe('ResertPasswordComponent', () => {
  let component: ResertPasswordComponent;
  let fixture: ComponentFixture<ResertPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResertPasswordComponent]
    });
    fixture = TestBed.createComponent(ResertPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

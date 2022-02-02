import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderPopupComponent } from './calender-popup.component';

describe('CalenderPopupComponent', () => {
  let component: CalenderPopupComponent;
  let fixture: ComponentFixture<CalenderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

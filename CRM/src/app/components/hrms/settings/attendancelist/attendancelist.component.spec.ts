import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancelistComponent } from './attendancelist.component';

describe('AttendancelistComponent', () => {
  let component: AttendancelistComponent;
  let fixture: ComponentFixture<AttendancelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

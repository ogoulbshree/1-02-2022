import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapprovesComponent } from './leaveapproves.component';

describe('LeaveapprovesComponent', () => {
  let component: LeaveapprovesComponent;
  let fixture: ComponentFixture<LeaveapprovesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapprovesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapprovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

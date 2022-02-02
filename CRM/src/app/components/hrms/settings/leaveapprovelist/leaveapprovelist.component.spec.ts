import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapprovelistComponent } from './leaveapprovelist.component';

describe('LeaveapprovelistComponent', () => {
  let component: LeaveapprovelistComponent;
  let fixture: ComponentFixture<LeaveapprovelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapprovelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapprovelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

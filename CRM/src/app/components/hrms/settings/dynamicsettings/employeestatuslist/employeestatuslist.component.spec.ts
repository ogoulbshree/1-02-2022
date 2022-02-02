import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeestatuslistComponent } from './employeestatuslist.component';

describe('EmployeestatuslistComponent', () => {
  let component: EmployeestatuslistComponent;
  let fixture: ComponentFixture<EmployeestatuslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeestatuslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeestatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCustomersComponent } from './service-customers.component';

describe('ServiceCustomersComponent', () => {
  let component: ServiceCustomersComponent;
  let fixture: ComponentFixture<ServiceCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

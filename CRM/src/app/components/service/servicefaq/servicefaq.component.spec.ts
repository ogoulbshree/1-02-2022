import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefaqComponent } from './servicefaq.component';

describe('ServicefaqComponent', () => {
  let component: ServicefaqComponent;
  let fixture: ComponentFixture<ServicefaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

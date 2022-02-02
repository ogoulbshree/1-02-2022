import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefaqlistComponent } from './servicefaqlist.component';

describe('ServicefaqlistComponent', () => {
  let component: ServicefaqlistComponent;
  let fixture: ComponentFixture<ServicefaqlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefaqlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefaqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulevisitsComponent } from './shedulevisits.component';

describe('ShedulevisitsComponent', () => {
  let component: ShedulevisitsComponent;
  let fixture: ComponentFixture<ShedulevisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedulevisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulevisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulevisitslistComponent } from './shedulevisitslist.component';

describe('ShedulevisitslistComponent', () => {
  let component: ShedulevisitslistComponent;
  let fixture: ComponentFixture<ShedulevisitslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedulevisitslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulevisitslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

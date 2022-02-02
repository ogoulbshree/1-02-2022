import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsourceComponent } from './leadsource.component';

describe('LeadsourceComponent', () => {
  let component: LeadsourceComponent;
  let fixture: ComponentFixture<LeadsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

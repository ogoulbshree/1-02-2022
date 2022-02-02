import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadslistComponent } from './leadslist.component';

describe('LeadslistComponent', () => {
  let component: LeadslistComponent;
  let fixture: ComponentFixture<LeadslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

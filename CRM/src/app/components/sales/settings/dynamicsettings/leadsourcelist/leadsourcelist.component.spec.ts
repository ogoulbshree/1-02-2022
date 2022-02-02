import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsourcelistComponent } from './leadsourcelist.component';

describe('LeadsourcelistComponent', () => {
  let component: LeadsourcelistComponent;
  let fixture: ComponentFixture<LeadsourcelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsourcelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsourcelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

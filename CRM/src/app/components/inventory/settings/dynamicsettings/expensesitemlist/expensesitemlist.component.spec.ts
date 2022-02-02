import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesitemlistComponent } from './expensesitemlist.component';

describe('ExpensesitemlistComponent', () => {
  let component: ExpensesitemlistComponent;
  let fixture: ComponentFixture<ExpensesitemlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesitemlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesitemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

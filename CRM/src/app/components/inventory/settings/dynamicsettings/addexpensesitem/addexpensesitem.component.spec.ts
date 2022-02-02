import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexpensesitemComponent } from './addexpensesitem.component';

describe('AddexpensesitemComponent', () => {
  let component: AddexpensesitemComponent;
  let fixture: ComponentFixture<AddexpensesitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddexpensesitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexpensesitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnproductlistComponent } from './returnproductlist.component';

describe('ReturnproductlistComponent', () => {
  let component: ReturnproductlistComponent;
  let fixture: ComponentFixture<ReturnproductlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnproductlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

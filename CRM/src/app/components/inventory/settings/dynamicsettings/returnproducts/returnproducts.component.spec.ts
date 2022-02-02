import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnproductsComponent } from './returnproducts.component';

describe('ReturnproductsComponent', () => {
  let component: ReturnproductsComponent;
  let fixture: ComponentFixture<ReturnproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

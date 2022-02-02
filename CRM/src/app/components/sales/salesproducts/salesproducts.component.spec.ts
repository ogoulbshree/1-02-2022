import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesproductsComponent } from './salesproducts.component';

describe('SalesproductsComponent', () => {
  let component: SalesproductsComponent;
  let fixture: ComponentFixture<SalesproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

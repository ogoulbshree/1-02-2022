import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesstageComponent } from './salesstage.component';

describe('SalesstageComponent', () => {
  let component: SalesstageComponent;
  let fixture: ComponentFixture<SalesstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

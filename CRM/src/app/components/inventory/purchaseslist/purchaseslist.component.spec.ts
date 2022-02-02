import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseslistComponent } from './purchaseslist.component';

describe('PurchaseslistComponent', () => {
  let component: PurchaseslistComponent;
  let fixture: ComponentFixture<PurchaseslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

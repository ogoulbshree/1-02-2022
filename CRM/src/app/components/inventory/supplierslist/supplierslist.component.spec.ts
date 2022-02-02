import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierslistComponent } from './supplierslist.component';

describe('SupplierslistComponent', () => {
  let component: SupplierslistComponent;
  let fixture: ComponentFixture<SupplierslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

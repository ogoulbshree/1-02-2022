import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesstagelistComponent } from './salesstagelist.component';

describe('SalesstagelistComponent', () => {
  let component: SalesstagelistComponent;
  let fixture: ComponentFixture<SalesstagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesstagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesstagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

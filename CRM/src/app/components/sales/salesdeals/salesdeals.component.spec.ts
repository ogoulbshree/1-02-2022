import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdealsComponent } from './salesdeals.component';

describe('SalesdealsComponent', () => {
  let component: SalesdealsComponent;
  let fixture: ComponentFixture<SalesdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

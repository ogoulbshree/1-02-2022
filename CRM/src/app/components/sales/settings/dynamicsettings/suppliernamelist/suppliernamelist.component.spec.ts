import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliernamelistComponent } from './suppliernamelist.component';

describe('SuppliernamelistComponent', () => {
  let component: SuppliernamelistComponent;
  let fixture: ComponentFixture<SuppliernamelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliernamelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliernamelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

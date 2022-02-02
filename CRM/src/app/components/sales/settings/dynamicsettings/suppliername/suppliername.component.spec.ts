import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliernameComponent } from './suppliername.component';

describe('SuppliernameComponent', () => {
  let component: SuppliernameComponent;
  let fixture: ComponentFixture<SuppliernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

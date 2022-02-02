import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserpageComponent } from './adduserpage.component';

describe('AdduserpageComponent', () => {
  let component: AdduserpageComponent;
  let fixture: ComponentFixture<AdduserpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleadsComponent } from './addleads.component';

describe('AddleadsComponent', () => {
  let component: AddleadsComponent;
  let fixture: ComponentFixture<AddleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

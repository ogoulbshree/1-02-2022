import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvisitsComponent } from './addvisits.component';

describe('AddvisitsComponent', () => {
  let component: AddvisitsComponent;
  let fixture: ComponentFixture<AddvisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

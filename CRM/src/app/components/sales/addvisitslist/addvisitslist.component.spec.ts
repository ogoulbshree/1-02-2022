import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvisitslistComponent } from './addvisitslist.component';

describe('AddvisitslistComponent', () => {
  let component: AddvisitslistComponent;
  let fixture: ComponentFixture<AddvisitslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvisitslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvisitslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

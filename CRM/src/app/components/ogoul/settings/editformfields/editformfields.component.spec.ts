import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformfieldsComponent } from './editformfields.component';

describe('EditformfieldsComponent', () => {
  let component: EditformfieldsComponent;
  let fixture: ComponentFixture<EditformfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

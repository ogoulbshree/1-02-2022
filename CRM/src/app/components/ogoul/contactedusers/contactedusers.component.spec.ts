import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactedusersComponent } from './contactedusers.component';

describe('ContactedusersComponent', () => {
  let component: ContactedusersComponent;
  let fixture: ComponentFixture<ContactedusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactedusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacteduserspageComponent } from './contacteduserspage.component';

describe('ContacteduserspageComponent', () => {
  let component: ContacteduserspageComponent;
  let fixture: ComponentFixture<ContacteduserspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContacteduserspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacteduserspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

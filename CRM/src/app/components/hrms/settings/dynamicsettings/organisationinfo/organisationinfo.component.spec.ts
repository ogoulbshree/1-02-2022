import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationinfoComponent } from './organisationinfo.component';

describe('OrganisationinfoComponent', () => {
  let component: OrganisationinfoComponent;
  let fixture: ComponentFixture<OrganisationinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

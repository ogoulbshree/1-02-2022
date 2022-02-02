import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationlistComponent } from './organisationlist.component';

describe('OrganisationlistComponent', () => {
  let component: OrganisationlistComponent;
  let fixture: ComponentFixture<OrganisationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationinfolistComponent } from './organisationinfolist.component';

describe('OrganisationinfolistComponent', () => {
  let component: OrganisationinfolistComponent;
  let fixture: ComponentFixture<OrganisationinfolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationinfolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationinfolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

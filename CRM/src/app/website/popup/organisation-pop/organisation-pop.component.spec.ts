import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationPopComponent } from './organisation-pop.component';

describe('OrganisationPopComponent', () => {
  let component: OrganisationPopComponent;
  let fixture: ComponentFixture<OrganisationPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

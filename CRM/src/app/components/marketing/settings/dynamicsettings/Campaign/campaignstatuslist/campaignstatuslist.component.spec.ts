import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignstatuslistComponent } from './campaignstatuslist.component';

describe('CampaignstatuslistComponent', () => {
  let component: CampaignstatuslistComponent;
  let fixture: ComponentFixture<CampaignstatuslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignstatuslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignstatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignstatusComponent } from './campaignstatus.component';

describe('CampaignstatusComponent', () => {
  let component: CampaignstatusComponent;
  let fixture: ComponentFixture<CampaignstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

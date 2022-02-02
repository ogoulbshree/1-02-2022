import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingdashboardComponent } from './marketingdashboard.component';

describe('MarketingdashboardComponent', () => {
  let component: MarketingdashboardComponent;
  let fixture: ComponentFixture<MarketingdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

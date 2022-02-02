import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaigntypelistComponent } from './campaigntypelist.component';

describe('CampaigntypelistComponent', () => {
  let component: CampaigntypelistComponent;
  let fixture: ComponentFixture<CampaigntypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaigntypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaigntypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

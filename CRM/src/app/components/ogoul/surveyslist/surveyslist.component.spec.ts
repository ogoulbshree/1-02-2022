import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyslistComponent } from './surveyslist.component';

describe('SurveyslistComponent', () => {
  let component: SurveyslistComponent;
  let fixture: ComponentFixture<SurveyslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

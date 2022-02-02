import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraininglistComponent } from './traininglist.component';

describe('TraininglistComponent', () => {
  let component: TraininglistComponent;
  let fixture: ComponentFixture<TraininglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraininglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraininglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

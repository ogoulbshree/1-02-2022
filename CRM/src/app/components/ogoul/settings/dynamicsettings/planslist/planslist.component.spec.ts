import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanslistComponent } from './planslist.component';

describe('PlanslistComponent', () => {
  let component: PlanslistComponent;
  let fixture: ComponentFixture<PlanslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

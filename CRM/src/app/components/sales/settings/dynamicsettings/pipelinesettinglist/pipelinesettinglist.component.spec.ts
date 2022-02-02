import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinesettinglistComponent } from './pipelinesettinglist.component';

describe('PipelinesettinglistComponent', () => {
  let component: PipelinesettinglistComponent;
  let fixture: ComponentFixture<PipelinesettinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelinesettinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesettinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

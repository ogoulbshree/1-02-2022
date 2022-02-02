import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallistComponent } from './deallist.component';

describe('DeallistComponent', () => {
  let component: DeallistComponent;
  let fixture: ComponentFixture<DeallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

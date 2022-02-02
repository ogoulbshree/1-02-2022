import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticetablistComponent } from './noticetablist.component';

describe('NoticetablistComponent', () => {
  let component: NoticetablistComponent;
  let fixture: ComponentFixture<NoticetablistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticetablistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticetablistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

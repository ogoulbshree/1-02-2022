import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticetabComponent } from './noticetab.component';

describe('NoticetabComponent', () => {
  let component: NoticetabComponent;
  let fixture: ComponentFixture<NoticetabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticetabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

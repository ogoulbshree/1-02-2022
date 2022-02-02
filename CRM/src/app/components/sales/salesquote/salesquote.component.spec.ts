import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesquoteComponent } from './salesquote.component';

describe('SalesquoteComponent', () => {
  let component: SalesquoteComponent;
  let fixture: ComponentFixture<SalesquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

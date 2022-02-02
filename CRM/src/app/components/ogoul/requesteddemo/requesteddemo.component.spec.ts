import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesteddemoComponent } from './requesteddemo.component';

describe('RequesteddemoComponent', () => {
  let component: RequesteddemoComponent;
  let fixture: ComponentFixture<RequesteddemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesteddemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesteddemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestdemoComponent } from './requestdemo.component';

describe('RequestdemoComponent', () => {
  let component: RequestdemoComponent;
  let fixture: ComponentFixture<RequestdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

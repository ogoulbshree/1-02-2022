import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesteddemopageComponent } from './requesteddemopage.component';

describe('RequesteddemopageComponent', () => {
  let component: RequesteddemopageComponent;
  let fixture: ComponentFixture<RequesteddemopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesteddemopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesteddemopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

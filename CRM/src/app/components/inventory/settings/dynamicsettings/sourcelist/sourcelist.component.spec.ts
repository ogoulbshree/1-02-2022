import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcelistComponent } from './sourcelist.component';

describe('SourcelistComponent', () => {
  let component: SourcelistComponent;
  let fixture: ComponentFixture<SourcelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

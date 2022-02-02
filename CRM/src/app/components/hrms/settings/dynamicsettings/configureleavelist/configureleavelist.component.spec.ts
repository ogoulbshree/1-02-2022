import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureleavelistComponent } from './configureleavelist.component';

describe('ConfigureleavelistComponent', () => {
  let component: ConfigureleavelistComponent;
  let fixture: ComponentFixture<ConfigureleavelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureleavelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureleavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

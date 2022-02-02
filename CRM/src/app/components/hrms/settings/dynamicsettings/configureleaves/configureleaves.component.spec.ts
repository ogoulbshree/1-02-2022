import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureleavesComponent } from './configureleaves.component';

describe('ConfigureleavesComponent', () => {
  let component: ConfigureleavesComponent;
  let fixture: ComponentFixture<ConfigureleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

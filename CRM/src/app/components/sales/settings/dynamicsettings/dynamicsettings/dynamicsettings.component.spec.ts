import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicsettingsComponent } from './dynamicsettings.component';

describe('DynamicsettingsComponent', () => {
  let component: DynamicsettingsComponent;
  let fixture: ComponentFixture<DynamicsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

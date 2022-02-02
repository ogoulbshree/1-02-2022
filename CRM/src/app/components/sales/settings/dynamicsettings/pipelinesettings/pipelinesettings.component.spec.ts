import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinesettingsComponent } from './pipelinesettings.component';

describe('PipelinesettingsComponent', () => {
  let component: PipelinesettingsComponent;
  let fixture: ComponentFixture<PipelinesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelinesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingpageComponent } from './ticketingpage.component';

describe('TicketingpageComponent', () => {
  let component: TicketingpageComponent;
  let fixture: ComponentFixture<TicketingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

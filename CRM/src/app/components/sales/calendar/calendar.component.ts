
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DBService } from 'src/app/services/dbservice.service';
import { CalenderService } from 'src/app/services/calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  events = [];
  calendarPlugins = [dayGridPlugin, interactionPlugin]; // important!
  x: number;
  y: number;
  date: Date;
  ready: boolean;
  event: any;
  last_touch: TouchEvent;

  ngOnInit(){
    this._dbservice.get_events().subscribe((events:any[]) => {
      this.events = events.map((x) => {x.id = x._id; return x});
      // console.log(this.events);
    });
  }

  constructor(private changeDetector: ChangeDetectorRef, private _dbservice: DBService){
  }

  touched(event){
    this.last_touch = event;
  }

  handle_click(event){
    this.x = null;
    this.y = null;
    this.changeDetector.detectChanges();
    if(event.jsEvent.type == "touchend"){
      this.x = this.last_touch.touches[0].clientX;
      this.y = this.last_touch.touches[0].clientY;
    }else{
      this.x = event.jsEvent.clientX;
      this.y = event.jsEvent.clientY;
    }
    let popup_width = 354;
    this.x = Math.min(window.innerWidth-popup_width, this.x);
    // console.log(this.x,this.y);
    this.date = event.date;
    this.event = null;
  }

  handle_event_click(event){
    this.x = null; 
    this.y = null;
    this.changeDetector.detectChanges();
    if(event.jsEvent.type == "touchend"){
      this.x = this.last_touch.touches[0].clientX;
      this.y = this.last_touch.touches[0].clientY;
    }else{
      this.x = event.jsEvent.clientX;
      this.y = event.jsEvent.clientY;
    }
    let popup_width = 354;
    this.x = Math.min(window.innerWidth-popup_width, this.x);
    // console.log(this.x,this.y);
    this.date = new Date(event.event.start.getTime());
    this.event = event.event;
  }

  get_event($event){
    if($event !== null){
      if(this.event){

        this.event.remove();
        let remove_index;
        for(let i = 0; i < this.events.length; i++){
          if(this.events[i].id == this.event.id){
            remove_index = i;
          }
        }
        this.events.splice(remove_index, 1);
        this.events = this.events.slice();

        if(!$event){
          this._dbservice.delete_event(this.event.id).subscribe(() => console.log());
        }
      }

      if($event){
        this.x = null;
        this.y = null;
        let color;
        switch($event.urgency){
          case "not_urgent":
            color = "green";
          break;
          case "moderate":
            color = "#ECAF00";
          break;
          case "urgent":
            color = 'rgb(255,0,0)';
          break;  
        }

        let start_time = $event.date.start_time.split(":")
        let end_time = $event.date.end_time.split(":")
        let start = new Date(this.date.getTime());
        let end = new Date(this.date.getTime());

        start.setHours(parseInt(start_time[0]), parseInt(start_time[1]));
        end.setHours(parseInt(end_time[0]), parseInt(end_time[1]));
        let new_event = {
          title: $event.title, 
          start: start, 
          end: end, 
          backgroundColor: color,
          borderColor: color,
          type: $event.type,
          emails: $event.emails,
          agenda: $event.agenda,
        } as any;
        if(this.event){
          this._dbservice.put_event(new_event, this.event.id).subscribe((res) => {});
          // console.log(new_event, this.event.id);
          new_event.id = this.event.id;
          this.events = this.events.concat(new_event);
        }else{
          this._dbservice.set_event(new_event).subscribe((db_id) => {
            new_event.id = db_id;
            // console.log(new_event);
            this.events = this.events.concat(new_event);
          });
        }
      }
    }
    this.x = null;
    this.y = null;
    this.event = null;
    this.date = null;
  }
}
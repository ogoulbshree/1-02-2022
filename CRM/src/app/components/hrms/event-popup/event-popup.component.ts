import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from '../../sales/date-validator.directive';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.css']
})
export class EventPopupComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() event_obj: any;
  @Output() event: EventEmitter<any>;

  new_event: any;
  date_error: boolean;

  get emails() {
    return this.new_event.get('emails') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.event = new EventEmitter<any>();
  }

  ngOnInit() {

    if(this.event_obj){
      let urgency
      let bg_color: string = this.event_obj.backgroundColor;
      if(bg_color ==  "green"){
        urgency = "not_urgent";
      }else if(bg_color == "#ECAF00"){
        urgency = "moderate";
      }else{
        urgency = "urgent";
      }
      let start_hours = this.event_obj.start.getHours();
      let end_hours = this.event_obj.end.getHours();
      let start_min = this.event_obj.start.getMinutes();
      let end_min = this.event_obj.end.getMinutes();

      if(this.event_obj.start.getHours().toString().length != 2){
        start_hours = "0" + this.event_obj.start.getHours();
      }
      if(this.event_obj.end.getHours().toString().length != 2){
        end_hours = "0" + this.event_obj.end.getHours();
      }
      if(this.event_obj.start.getMinutes().toString().length != 2){
        start_min = "0" + this.event_obj.start.getMinutes();
      }
      if(this.event_obj.end.getMinutes().toString().length != 2){
        end_min = "0" + this.event_obj.end.getMinutes();
      }
      let start = start_hours + ":" + start_min;
      let  end = end_hours + ":" + end_min;

      this.new_event = this.fb.group({
        title: [this.event_obj.title, Validators.required],
        date: this.fb.group({
          start_time: [start],
          end_time: [end],
        }, {validators: dateValidator}),
        type: [this.event_obj.extendedProps.type, Validators.required],
        urgency: [urgency, Validators.required],
        agenda: [this.event_obj.extendedProps.agenda, Validators.required],
        emails: this.fb.array(this.event_obj.extendedProps.emails), 
      });
    }else{
      this.new_event = this.fb.group({
        title: ['', Validators.required],
        date: this.fb.group({
          start_time: [''],
          end_time: [''],
        }, {validators: dateValidator}),
        type: ['', Validators.required],
        urgency: ['', Validators.required],
        agenda: ['', Validators.required],
        emails: this.fb.array([
        ])
      });

      
    }
  }

  add_emails(){
    this.emails.push(this.fb.control('', Validators.compose([Validators.email, Validators.required])));
  }

  onSubmit(){
    this.event.emit(this.new_event.value);
  }

  cancel(){
    this.event.emit(null);
  }

  delete(){
    this.event.emit("");
  }

  remove_email(index: number){
    this.emails.removeAt(index);
  }
}

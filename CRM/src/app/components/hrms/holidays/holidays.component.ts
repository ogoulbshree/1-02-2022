import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { HolidayDetail } from 'src/app/models/HolidayDetail.model';
import { DBService } from 'src/app/services/dbservice.service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent  extends DynamicComponent implements OnInit {
  holidayDetail = new HolidayDetail();
  public holiday_id: string;


  constructor(private dialogRef: MatDialog,private toast: ToastrService,private datepipe: DatePipe,public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_HOLIDAYLIST, injector);
  }

  async ngOnInit() {
    await this.populateFields();
    // this.holidayDetail = new HolidayDetail();
    if (this.holiday_id) {
      this._dbService.getHolidayByID(this.holiday_id).subscribe(holiday => {
        // console.log(holiday);
        if (holiday) {
          this.holidayDetail = holiday["data"]
        }
      })
    }
  }
  
  async submit() {
    
    try {
     
        if (this.holiday_id) {
          let obj = {
            holiday_name: this.holidayDetail.holiday_name,
            holiday_id: this.holidayDetail.holiday_id,
            holiday_date: this.holidayDetail.holiday_date,
            holiday_day: this.holidayDetail.holiday_day,
            created_time: this.holidayDetail.created_time,
            modified_time: Date.now(),
            updated_by: this.holidayDetail.updated_by,
            created_by: this.holidayDetail.created_by,
          } as HolidayDetail
          this._dbService.updateHoliday(obj).subscribe(x => {
            this.dialogRef.closeAll();
          });
        }
        else {
          let obj = {
            holiday_name: this.holidayDetail.holiday_name,
            holiday_id: Date.now(),
            holiday_date: this.holidayDetail.holiday_date,
            holiday_day: this.holidayDetail.holiday_day,
            created_time: Date.now(),
            modified_time: Date.now(),
            updated_by: this._dbService.getCurrentUserDetail().email,
            created_by: this._dbService.getCurrentUserDetail().email
          } as HolidayDetail
          this._dbService.addHoliday(obj).subscribe(x => {
           
            this.dialogRef.closeAll();
    
          });
        }
    }
    catch (error) {
      console.log("I am error", error);

    }


  }

}

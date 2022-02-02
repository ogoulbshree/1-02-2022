import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { HolidayDetail } from 'src/app/models/HolidayDetail.model';
import { DBService } from 'src/app/services/dbservice.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css']
})
export class OrganisationsComponent implements OnInit {
  employeeDetail;
  public employee_id: string;
  designationDetail: any;
  employeeArr=[];
  constructor(private dialogRef: MatDialog, public _dbService: DBService,) { }

  ngOnInit() {
    this.employeeDetail = new EmployeeDetail();
    if (this.employee_id) {
      this._dbService.getEmployeeByID(this.employee_id).subscribe(async employee => {
        console.log(employee);
        let result = await this._dbService.getAllDesignations().toPromise();
        this.designationDetail = result["data"];
        let result1 = await this._dbService.getAllEmployees().toPromise();
        this.employeeArr = result1["data"];
        if (employee) {
          this.employeeDetail = employee["data"]
        }
      })
    }
  }
  selectedDesignation(evt){
    console.log(evt);
    
    this.employeeDetail.designation_weight =this.designationDetail.find(x=>x.designation_name == evt.target.value).designation_weight
    console.log( this.employeeDetail.designation_weight);

  }
  async onSubmit() {
    this.employeeDetail.updated_by = this._dbService.getCurrentUserDetail().email;
    this.employeeDetail.modified_time = Date.now();
    try {
      let result = null;
      result = await this._dbService.updateEmployee(this.employeeDetail).toPromise();
      this.dialogRef.closeAll();
      
    }

    catch (error) {
      CustomMisc.showAlert(error.error.message, true);
    }

  }
  async submit() {

    try {

      if (this.employee_id) {
        let obj = {
          holiday_name: this.employeeDetail.holiday_name,
          holiday_id: this.employeeDetail.holiday_id,
          holiday_date: this.employeeDetail.holiday_date,
          holiday_day: this.employeeDetail.holiday_day,
          created_time: this.employeeDetail.created_time,
          modified_time: Date.now(),
          updated_by: this.employeeDetail.updated_by,
          created_by: this.employeeDetail.created_by,
        } as HolidayDetail
        this._dbService.updateHoliday(obj).subscribe(x => {
          this.dialogRef.closeAll();
        });
      }
      else {
        let obj = {
          holiday_name: this.employeeDetail.holiday_name,
          holiday_id: Date.now(),
          holiday_date: this.employeeDetail.holiday_date,
          holiday_day: this.employeeDetail.holiday_day,
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

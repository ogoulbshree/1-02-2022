import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LeaveDetail } from 'src/app/models/LeaveDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent extends DynamicComponent implements OnInit {
  leaveDetail = new LeaveDetail();;
  dateErrorFlag: Boolean = false;
  public leave_id: string;
  employeeArr=[];
 


  constructor(private dialogRef: MatDialog,private toast: ToastrService,private datepipe: DatePipe,public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVES_LIST, injector);
  }

  async ngOnInit() {
    await this.populateFields();
    
    this._dbService.getAllEmployees().subscribe((employee)=>{
      this.employeeArr = employee["data"]
    })
    this.leaveDetail = new LeaveDetail();
    this.leaveDetail.leave_mail = this._dbService.getCurrentUserDetail().email
    if (this.leave_id) {
      this._dbService.getLeaveByID(this.leave_id).subscribe(leave => {
        if (leave) {
          this.leaveDetail = leave["data"];
        }
      })
    }
  }
  
  selectMail(evt){
  let employee = this.employeeArr.find(x=>x.email ==evt.target.value);

  if(employee){
    this.leaveDetail.leave_mail = employee.email
    this.leaveDetail.leave_assigned_to = employee.assigned_to
  }
    

  }
  dateSelected() {
   if (this.leaveDetail.leave_from && this.leaveDetail.leave_to && new Date(this.leaveDetail.leave_from) > new Date(this.leaveDetail.leave_to)) {
      this.dateErrorFlag = true
    }
    else if(new Date(this.leaveDetail.leave_from) < new Date(this.leaveDetail.leave_to)){
      this.dateErrorFlag = false
    }


  }
  async submit() {

    try {
      if (!this.dateErrorFlag) {
        if (this.leaveDetail.leave_from && this.leaveDetail.leave_to) {
          var date1 = new Date(this.leaveDetail.leave_from);
          var date2 = new Date(this.leaveDetail.leave_to);
          var Time = date2.getTime() - date1.getTime();
          this.leaveDetail.leave_days  = ((Time / (1000 * 3600 * 24)) +1);
        }

        if (this.leave_id) {
          let obj = {
            leave_id: this.leaveDetail.leave_id,
            leave_type: this.leaveDetail.leave_type,
            leave_from: this.leaveDetail.leave_from,
            leave_to: this.leaveDetail.leave_to,
            leave_days: this.leaveDetail.leave_days,
            leave_reason: this.leaveDetail.leave_reason,
            created_time: this.leaveDetail.created_time,
            leave_assigned_to:this.leaveDetail.leave_assigned_to,
            leave_mail:this.leaveDetail.leave_mail,
            modified_time: Date.now(),
            updated_by: this.leaveDetail.updated_by,
            created_by: this.leaveDetail.created_by,
          } as LeaveDetail
          this._dbService.updateLeave(obj).subscribe(x => {
            this.dialogRef.closeAll();
          });
        }
        else {
          let obj = {
            leave_id: Date.now(),
            leave_type: this.leaveDetail.leave_type,
            leave_from: this.leaveDetail.leave_from,
            leave_to: this.leaveDetail.leave_to,
            leave_days: this.leaveDetail.leave_days,
            leave_reason: this.leaveDetail.leave_reason,
            leave_mail:this.leaveDetail.leave_mail,
            leave_assigned_to:this.leaveDetail.leave_assigned_to,
            created_time: Date.now(),
            modified_time: Date.now(),
            updated_by: this._dbService.getCurrentUserDetail().email,
            created_by: this._dbService.getCurrentUserDetail().email
          } as LeaveDetail
          this._dbService.addLeave(obj).subscribe(x => {
            let employee = this.employeeArr.find(x=>x.email == this.leaveDetail.leave_mail);
            if(employee){
              employee.leaves_available -= this.leaveDetail.leave_days;
           
              this._dbService.updateEmployee(employee).subscribe(x=>{
                console.log(x)
              })
            }
           
            this.dialogRef.closeAll();

          });
        }
      }

    }
    catch (error) {
      console.log("I am error", error);

    }


  }

}

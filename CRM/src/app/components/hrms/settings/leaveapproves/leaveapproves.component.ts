import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { LeaveDetail } from 'src/app/models/LeaveDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-leaveapproves',
  templateUrl: './leaveapproves.component.html',
  styleUrls: ['./leaveapproves.component.css']
})
export class LeaveapprovesComponent  extends DynamicComponent implements OnInit {
  leaveArray = [];
  keyword = 'first_name';
  date;
  dateErrorFlag: Boolean = false;
  leaveDetail= new LeaveDetail();
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,
    public _uiservice: UiService, @Inject(LOCALE_ID) public locale: string,) {
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVE_APPROVE,injector);

  }
  isUpdate = false;

  filteredTableDataArr: any;
  travelDataArr = [];
  selectedEmployee;
  assignedObj=[]

   htmlInit() {
    // this._dbService.getAllLeave(1).subscribe(x=>
   this._dbService.getAllLeaves().subscribe((x: any) => 
   {
     this.leaveArray = x.data;
    //  console.log(this.leaveArray);
     
     this.leaveArray.map(y=>{
      //  console.log(this.assignedObj);
        if(this.assignedObj.length==0)
        {
          let obj = {
              name:y.leave_assigned_to,
              count:1,
              leave_from:y.leave_from
          }
          this.assignedObj.push(obj)
        }
        else{
          let result = this.assignedObj.findIndex(z =>(z.name == y.leave_assigned_to) && (z.leave_from == y.leave_from));
          // console.log(result);
          
          if(result !=  -1){
            this.assignedObj[result].count ++;
          }
          else{
            let obj = {
              name:y.leave_assigned_to,
              count:1,
              leave_from:y.leave_from
          }
          this.assignedObj.push(obj)
          }
        }
    
     })
    })

  }

  async ngOnInit() {

     this.htmlInit();
     await this.populateFields();
    
    // this.leaveDetail = new LeaveDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        // console.log("params:", params);
        let leave_id = params["id"];
        if (leave_id) {
          let result = await this._dbService.getLeaveByID(leave_id).toPromise();
          //console.log(result);
          this.leaveDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );


  }

  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save designation...", this.leaveDetail);

    this.leaveDetail.updated_by = this._dbService.getCurrentUserDetail().email;

    /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.leaveDetail.modified_time = Date.now();
    try {
      let result = null;
      result = await this._dbService.updateLeave(this.leaveDetail).toPromise();
      CustomMisc.showAlert(" Leave Updated Successfully");
      this._router.navigate(["hrms/settings/leaveapprovelist"]);


      this.showError = "";

    }

    catch (error) {
      /*  CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
       CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
       CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
       CustomLogger.logError(error.message); */
      CustomMisc.showAlert(error.error.message, true);
      this.showError = error.error.message;
    }

  }


  onClickForm() {
    // this.leaveDetail.designation_name = "";
  }
  selectEvent(employee) {
    // console.log("employee", employee);;

    this.selectedEmployee = employee["first_name"];
    // console.log(this.selectedEmployee);

  }

}
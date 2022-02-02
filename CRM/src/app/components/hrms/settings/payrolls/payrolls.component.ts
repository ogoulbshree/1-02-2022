import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { AttachmentService } from 'src/app/services/attachment.service';
import { DBService } from 'src/app/services/dbservice.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { UiService } from 'src/app/services/ui.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
import { PayRollDetail } from 'src/app/models/PayRollDetails.model';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
@Component({
  selector: 'app-payrolls',
  templateUrl: './payrolls.component.html',
  styleUrls: ['./payrolls.component.css']
})
export class PayrollsComponent extends DynamicComponent implements  OnInit {

  attachmenstsData;
  payrollDetail= new PayRollDetail();
  isUpdate = false;
  flagShowDefaultIcon = true;
  activityDetail: ActivityDetail[] = [];
  departmentDetail: DepartmentDetail[] = [];
  sourceDetail: SourceDetail[] =[];
  filteredTableDataArr: any;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  rowsOnPage=5;
  accountpattern ="[a-zA-Z0-9 ]+"
  first_name;
  keyword = 'first_name';
  isValidFormSubmitted = false;
  invalid_file =true;
  file: any;
  notes: any[];
  selectedEmployee = new EmployeeDetail();
  attchment ={
    
    title: ''
  }
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  employeeArray=[];
  designationDetail=[];
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,  
     @Inject(LOCALE_ID) public locale: string,
    private toast: ToastrService,  private attacSrv: AttachmentService,public _uiservice:UiService, ) 
  {
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYROLL,injector);
    }

  
    
  
  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    )
     {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }

  

  this.CAN_ADD = false;
 /*  let result = await this._dbService.getAllActivity().toPromise();
    
    console.log("result:", result);
    this.activityDataArr = result["data"];
    this.filteredTableDataArr = this.activityDataArr;*/

  } 

  async htmlInit() {
    
    let result = await this._dbService.getAllDepartment(1).toPromise();
    this.departmentDetail = result["results"];

{
    let result = await this._dbService.getAllEmployees().toPromise();
  this.employeeArray = result["data"];
} 
{
  let result = await this._dbService.getAllDesignations().toPromise();
  this.designationDetail = result["data"];
}

/* {let res = await this._dbService.getAllnotes().toPromise();
this.notes = res["data"];
}  */ 

  }

catch (error) {
  CustomLogger.logStringWithObject("ERROR:", error);
}



  
    async ngOnInit() {
      await this.htmlInit();
   await this.init();
   await this.populateFields();
    // this.payrollDetail = new PayRollDetail();
    // this.selectedEmployee = new EmployeeDetail()
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let payroll_id = params["id"];
        if (payroll_id) {
           this._dbService.getPayroll(payroll_id).subscribe(x=>{
            this.payrollDetail = x["data"];
            // console.log(this.employeeArray,this.payrollDetail);
            if(this.employeeArray)
            this.selectedEmployee=this.employeeArray.find(x=>x.employee_id == this.payrollDetail.employee_id)
            // console.log(this.payrollDetail);
            // console.log(this.selectedEmployee);
            this.isUpdate = true;
            this.flagShowDefaultIcon = false;
           })
        
          
         // console.log(result);
          
        
    
         
      
    
        }
          else{
            this.isUpdate = false;
            this.notes = [];
            this.payrollDetail = new PayRollDetail();
          }
           
        })
      }
    
     
  
  showError = "";
  selectEvent(data) {
    // console.log("employee", data);;
    if(data != "first_name")
    this.selectedEmployee = data;
   
    // console.log(this.selectedEmployee);

  } 
  updateNetSalary(){}
  onChangeSearch(evt){}
  onFocused(evt){}
  async onSubmit() {
   
  
    // this.payrollDetail.object_type = GlobalConstants.OBJECT_DETAIL_CUSTOMER;
      //CustomLogger.logStringWithObject("Will save Customer...", this.payrollDetail);
  
      this.payrollDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
      this.payrollDetail.employee_id = this.selectedEmployee.employee_id.toString()
      this.payrollDetail.modified_time = Date.now();
      this.payrollDetail.net_salary = +this.payrollDetail.basic_salary+ +this.payrollDetail.allowance_transportation+
      +this.payrollDetail.allowance_food+ +this.payrollDetail.allowance_accomadation;
  try {
        let result = null;
        if (this.isUpdate){
        result = await this._dbService.updatePayroll(this.payrollDetail).toPromise();
        }
    else{
  
    this.payrollDetail.created_by= this._dbService.getCurrentUserDetail().email;

    this.payrollDetail.created_time = Date.now();
    result = await this._dbService.addPayroll(this.payrollDetail).toPromise();
    }
   // CustomLogger.logStringWithObject("addedCustomer:result:", result);
    if (!this.isUpdate)
        CustomMisc.showAlert("payroll Added Successfully");
    else
        CustomMisc.showAlert("payroll Updated Successfully");
    this._router.navigate(["/hrms/settings/payrolllist"]);
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

onClickEdit(obj) {
  this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
}

async onClickDelete(obj) {
 //g console.log("will delete activity:::", obj);
  await this._dbService.deleteActivity(obj).toPromise();
  await this.init();
}



onClickDeletenote(obj){
  //delete notes from array
  this.notes.splice(this.notes.indexOf(obj),1);

  //send to db to delete
  this._dbService.deleteNotes(obj).toPromise().then(
    (res) => {},
      (err) => {}  );
}

}
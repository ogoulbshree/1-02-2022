import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { EmployeestatusDetail } from 'src/app/models/EmployeestatusDetails.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent extends DynamicComponent implements OnInit {
  public employee: string;
  first_name;
  employeeDetail;
  file;
  preview: string;
  profile_picture;
  form: FormGroup;
  closeDialogFlag:Boolean=false;
  designationDetail :any;
  employeestatusDetail : EmployeestatusDetail;
  totalLeavesAvailable: number=0;
  employeeArr=[];
  constructor(private dialogRef: MatDialog, public fb: FormBuilder, private _activatedRoute: ActivatedRoute,public _uiservice:UiService,injector: Injector
    ) {
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEES,injector);
      
    this.form = this.fb.group({
      name: [''],
      files: [null]
    })
  }

  async htmlInit() {
    this.totalLeavesAvailable=0;
    let result = await this._dbService.getAllDesignations().toPromise();
    this.designationDetail = result["data"];
   
  {
    
    let result = await this._dbService.getAllEmployeestatus(1).toPromise();
    this.employeestatusDetail = result["results"];
   
  }
  {
    
    let result = await this._dbService.getAllEmployees().toPromise();
    this.employeeArr = result["data"];
   
  }
  
  this.getTotalLeaves()
  }
  selectedDesignation(evt){
    
    this.employeeDetail.designation_weight =this.designationDetail.find(x=>x.designation_name == evt.target.value).designation_weight

  }
  async ngOnInit() {
    await this.htmlInit();
    await this.populateFields();
    this.employeeDetail = new EmployeeDetail();
    if (this.employee) {
      // console.log("here");

      this._dbService.getEmployeeByID(this.employee).subscribe((employee:any) => {
        // console.log(employee);
          
          this.designationDetail.designation=employee.data.designation
        if (employee) {
          this.employeeDetail = employee["data"]
        }
      })
    }
    // console.log(this.employeeDetail);



  }
  getTotalLeaves(){

    this._dbService.getAllLeaveTypes().subscribe(x=>{ 
      x["data"].map(y=>{ 
      // console.log(this.totalLeavesAvailable,y);
       this.totalLeavesAvailable += y.leavetype_days  ;
     })
    })
    

  }
  selectImage(event) {
    /* const file = (event.target as HTMLInputElement).files[0]; */
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;

      this.form.patchValue({ files: file });
      this.form.get('files').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }
  async upload(files: FileList) {
    // console.log(" files.item(0);", files.item(0));

  }

  async submit() {
    // console.log(this.totalLeavesAvailable);
    
    try {
      if (this.file != undefined || this.file != null) {
        const formData = new FormData();
        formData.append('file', this.file);
         let result = await this._dbService.uploadFile(formData).toPromise();
         let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
         //CustomLogger.logStringWithObject("files:", fileName);
         this.employeeDetail.profile_picture = fileName;
      }
      else{
        this.employeeDetail.profile_picture='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
      }
      
      
      if (this.employee) {
        let obj = {
          first_name: this.employeeDetail.first_name,
          user_name: this.employeeDetail.user_name,
          password: this.employeeDetail.password,
          phone: this.employeeDetail.phone,
          department_no: this.employeeDetail.department_no,
          last_name: this.employeeDetail.last_name,
          email: this.employeeDetail.email,
          confirm_password: this.employeeDetail.confirm_password,
          joining_date: this.employeeDetail.joining_date,
          designation: this.employeeDetail.designation,
          profile_picture: this.employeeDetail.profile_picture,
          employee_status:this.employeeDetail.employee_status,
          employee_id: this.employeeDetail.employee_id,
          created_time: this.employeeDetail.created_time,
          modified_time: Date.now(),
          updated_by: this.employeeDetail.updated_by,
          created_by: this.employeeDetail.created_by,
          leaves_available:this.totalLeavesAvailable,
          designation_weight: this.employeeDetail.designation_weight,
          assigned_to:this.employeeDetail.assigned_to,
          employee_bank: this.employeeDetail.employee_bank,
          employee_account_number:this.employeeDetail.employee_account_number
        } as EmployeeDetail
        this._dbService.updateEmployee(obj).subscribe(x => {
          this.dialogRef.closeAll();
        });
      }
      else {
        let obj = {
          first_name: this.employeeDetail.first_name,
          user_name: this.employeeDetail.user_name,
          password: this.employeeDetail.password,
          phone: this.employeeDetail.phone,
          department_no: this.employeeDetail.department_no,
          last_name: this.employeeDetail.last_name,
          email: this.employeeDetail.email,
          confirm_password: this.employeeDetail.confirm_password,
          joining_date: this.employeeDetail.joining_date,
          designation: this.employeeDetail.designation,
          leaves_available:this.totalLeavesAvailable,
          profile_picture: this.employeeDetail.profile_picture,
          employee_status:this.employeeDetail.employee_status,
          employee_id: Date.now(),
          created_time: Date.now(),
          modified_time: Date.now(),
          updated_by: this._dbService.getCurrentUserDetail().email,
          created_by: this._dbService.getCurrentUserDetail().email,
          designation_weight: this.employeeDetail.designation_weight,
          assigned_to:this.employeeDetail.assigned_to,
          employee_bank: this.employeeDetail.employee_bank,
          employee_account_number:this.employeeDetail.employee_account_number
        } as EmployeeDetail
        this._dbService.addEmployees(obj).subscribe(x => {
         
          this.dialogRef.closeAll();
  
        });
      }
        // CustomLogger.logStringWithObject("uploadFile:result:", result);

      
    }
    catch (error) {
      // console.log("I am error", error);

    }


  }

}

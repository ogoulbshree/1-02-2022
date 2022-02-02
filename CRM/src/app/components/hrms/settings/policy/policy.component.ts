import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';

import { formatDate } from "@angular/common";
import { of } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyDetails } from 'src/app/models/PolicyDetails.model';
import { DBService } from 'src/app/services/dbservice.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';
import { UiService } from 'src/app/services/ui.service';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
const uri = 'http://localhost:3000/api/uploadpolicy';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent extends DynamicComponent  implements OnInit {

 

  isUpdate = false;
  invalid_file =true;
  file :any;
  description;
  notes: any[];
  
  policyDetail : PolicyDetails;
  filteredTableDataArr: any;
  policyDataArr = [];
  form: FormGroup;
  preview: string;
  

 
currentDate = new Date();
  dateFormat = "dd MMM yyyy";

  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  uploader:FileUploader = new FileUploader({url:uri});

  constructor( private _router: Router, public fb: FormBuilder,public _uiservice:UiService, private _activatedRoute: ActivatedRoute,injector: Injector,@Inject(LOCALE_ID) public locale: string,)
   {
   
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_POLICY_LIST,injector);
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.policyDataArr.push(JSON.parse(response));
  
    }

 

  
   }


  async ngOnInit() {
   
    this.policyDetail = new PolicyDetails();

await this.populateFields();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let policy_id = params["id"];
        if (policy_id) {
          let result = await this._dbService.getPolicy(policy_id).toPromise();
          //console.log(result);
          this.policyDetail = result["data"];
          this.isUpdate = true;}
          
          }
      )}
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
  
  this.policyDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.policyDetail.modified_time = Date.now();
try {
    let result = null;
  //CustomLogger.logStringWithObject("FILES:", this.file);
    if (this.file != undefined || this.file != null) {
      const formData = new FormData();
      formData.append('file', this.file);
      result = await this._dbService.uploadFile(formData).toPromise();
     // CustomLogger.logStringWithObject("uploadFile:result:", result);

      let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
      //CustomLogger.logStringWithObject("files:", fileName);
      this.policyDetail.files = fileName;
      

    }
    if (this.isUpdate){
    result = await this._dbService.updatePolicy(this.policyDetail).toPromise();
    }
else{
this.policyDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.policyDetail.created_time = Date.now();
result = await this._dbService.addPolicy(this.policyDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addPolicy Added Successfully");
else
    CustomMisc.showAlert("addPolicy Updated Successfully");
this._router.navigate(["hrms/settings/policylist"]);

this.showError = "";
 
}

catch (error) {
  /* CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message);
   */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}
selectImg(event){
  /* const file = (event.target as HTMLInputElement).files[0]; */
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.file = file;
  
  this.form.patchValue({files: file});
  this.form.get('files').updateValueAndValidity()
  
  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.preview = reader.result as string;
  }
  reader.readAsDataURL(file)
  }
  }
 upload(event: Event){
  this.file = event.target as HTMLInputElement;
  this.invalid_file = false;
} 

}



  
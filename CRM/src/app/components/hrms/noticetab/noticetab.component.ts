import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticetabDetail } from 'src/app/models/NoticeTabDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-noticetab',
  templateUrl: './noticetab.component.html',
  styleUrls: ['./noticetab.component.css']
})
export class NoticetabComponent extends DynamicComponent implements OnInit {

 
  
    currentDate = new Date();
    dateFormat = "dd MMM yyyy";
    currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
    

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice:UiService,@Inject(LOCALE_ID) public locale: string,
					 
    injector: Injector,public fb: FormBuilder) {
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_NOTICE,injector);
      
    this.form = this.fb.group({
      name: [''],
      attachment: [null]
    })
   
   }
  isUpdate = false;
  key: string = 'id'
  reverse :boolean = false;
  p:number =1;
  noticetabDetail =  new NoticetabDetail() ;
  filteredTableDataArr: any;
  noticetabDataArr = [];
  form: FormGroup;
  preview: string;
  file

  async ngOnInit() {
    await this.populateFields();
    // this.noticetabDetail = new NoticetabDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let notice_tab_id = params["id"];
        if (notice_tab_id) {
          let result = await this._dbService.getNoticetab(notice_tab_id).toPromise();
          //console.log(result);
          this.noticetabDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
 this.noticetabDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.noticetabDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateNoticetab(this.noticetabDetail).toPromise();
    }
else{
this.noticetabDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.noticetabDetail.created_time = Date.now();
result = await this._dbService.addNoticetab(this.noticetabDetail).toPromise();
if(result && result["data"]){
  let new_event = {
    title: result["data"].notice_type, // a property!
    start: result["data"].notice_date, // a property!
    end: result["data"].notice_date, // a property! ** see important note below about 'end' **
    notice_tab_id:result["data"].notice_tab_id
  } as any;
  
  this._dbService.set_event(new_event).subscribe((db_id) => {
    
    console.log(new_event);
   
  });
}

}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Noticetab Added Successfully");
else
    CustomMisc.showAlert("addDepartment Updated Successfully");
this._router.navigate(["/hrms/noticetablist"]);

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


selectImage(event){
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
onClickForm() {
 
}
}
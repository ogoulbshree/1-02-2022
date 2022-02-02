
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetail } from 'src/app/models/Ticketing.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { StatusDetail } from 'src/app/models/StatusDetail.model';
import { Serviceticketing } from 'src/app/models/Serviceticketing.model';

import { EscalationDetail } from 'src/app/models/EscalationDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-ticketingpage',
  templateUrl: './ticketingpage.component.html',
  styleUrls: ['./ticketingpage.component.css']
})
export class TicketingpageComponent extends DynamicComponent implements OnInit {

  

  file 
  
  form: FormGroup;
  userDetail: UserDetail[]=[];
  statusDetail: StatusDetail[]=[]
  escalationDetail:EscalationDetail;
  isUpdate = false;

  ticketDetail : Serviceticketing;
  filteredTableDataArr: any;
  ticketDataArr = [];
  escalationDataArr =[];

  preview: string;

  Escalation ={
    escalation_to_email:'',
    comments: ''
  }
 
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector, 
    public _uiservice:UiService, public fb: FormBuilder, @Inject(LOCALE_ID) public locale: string,) 
    { 
      super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_TICKETING,injector);
    // Reactive Form
    this.form = this.fb.group({
     name: [''],
     files: [null]
   })
   
 }
  
 
 

/* async Init() {
  this.escalationDetail = new EscalationDetail();
  this._activatedRoute.params.subscribe(
    async params => {
      console.log("params:", params);
      let escalation_id = params["id"];
      if (escalation_id) {
        let result = await this._dbService.getEscalation(escalation_id).toPromise();
        console.log(result);
        this.escalationDetail = result["data"];
        this.isUpdate = true;
       
      }
     
    }
  );

} */


async htmlInit() 
  {
  
    {
  let result = await this._dbService.getAllUsers().toPromise();
  
    this.userDetail = result["data"];
    }
    {
    let result = await this._dbService.getAllStatus().toPromise();
      this.statusDetail = result["data"];
  }
/* {
  let result = await this._dbService.getAllEscalation().toPromise();
  console.log("result:", result);
  this.escalationDetail = result["data"];
   this.filteredTableDataArr = this.escalationDetail; 
} */

 {
  let result = await this._dbService.getAllserviceTicketing(1).toPromise();
 // console.log("result:", result);
  this.ticketDetail = result["results"];
   this.filteredTableDataArr = this.ticketDetail; 
} 
  }
catch (error) {
    CustomLogger.logStringWithObject("ERROR:", error);
    
}

  async ngOnInit() {
    await this.htmlInit() ;
/* await this.Init(); */
await this.populateFields();
    this.ticketDetail = new Serviceticketing();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let ticket_id = params["id"];
        let result = await this._dbService.getserviceTicketing(ticket_id).toPromise();
        if (ticket_id && result) {
         
          this.ticketDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.ticketDetail.files;
          this._dbService.getEscalation(this.ticketDetail.ticket_id).subscribe((Escalation:any) => {
          //  console.log();
            this.Escalation = Escalation;
            if(!this.Escalation){
              this.Escalation = result ["data"];
            }
          });
      
    
        }
          else{
            let result= null
            this.isUpdate = false;
            if(result)
            this.Escalation =result ["data"];
            this.ticketDetail = new Serviceticketing();
          }
          })
        }


    
  
    
  
 
   
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save Ticketing...", this.ticketDetail);
 
  
  this.ticketDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
 
  this.ticketDetail.modified_time = Date.now(); 
  try {
    let result = null;
  //  CustomLogger.logStringWithObject("FILES:", this.file);
    if (this.file != undefined || this.file != null) {
      const formData = new FormData();
      formData.append('file', this.file);
      result = await this._dbService.uploadFile(formData).toPromise();
     // CustomLogger.logStringWithObject("uploadFile:result:", result);

      let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
    //  CustomLogger.logStringWithObject("files:", fileName);
      this.ticketDetail.files = fileName;

    }
  
    if (this.isUpdate){
    result = await this._dbService.updateserviceTicketing(this.ticketDetail).toPromise();
    }
else{
 this.ticketDetail.created_by= this._dbService.getCurrentUserDetail().email;

      this.ticketDetail.created_time = Date.now(); 
result = await this._dbService.addserviceTicketing(this.ticketDetail).toPromise();
}
//CustomLogger.logStringWithObject("Ticketing:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Our team will contact you soon ");
else
    CustomMisc.showAlert("Ticketing Updated Successfully");
this._router.navigate(["/service/ticketdetails"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in in Ticketing  : " + error.message, true);
}    
}


async onSave() {
    
try {
    let result = null;
    if (this.isUpdate) {
    result = await this._dbService.updateEscalation(this.escalationDetail).toPromise();
    }
else {

result = await this._dbService.addEscalation(this.escalationDetail).toPromise();
}

//CustomLogger.logStringWithObject("escalation:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("escalation Added Successfully");
else
    CustomMisc.showAlert("escalation Updated Successfully");
this._router.navigate([""]);


} 

catch (error) {
CustomLogger.logError(error);
CustomMisc.showAlert("Error in adding Escalation: " + error.message, true);
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
 /*  this.categoryDetail.category_name = ""; */
  
}


}

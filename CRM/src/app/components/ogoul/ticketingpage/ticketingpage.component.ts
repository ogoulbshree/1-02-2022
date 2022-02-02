
import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
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
import { OgoulTicketDetail } from 'src/app/models/Ogoulticketing.model';



@Component({
  selector: 'app-ticketingpage',
  templateUrl: './ticketingpage.component.html',
  styleUrls: ['./ticketingpage.component.css']
})
export class TicketingpageComponent implements OnInit {

  

  file 
  
  form: FormGroup;
  userDetail: UserDetail[]=[];
  statusDetail: StatusDetail[]=[]
  preview: string;
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice:UiService, public fb: FormBuilder,) { 
    // Reactive Form
    this.form = this.fb.group({
     name: [''],
     files: [null]
   })
 }
  isUpdate = false;

  ogoulticketDetail :OgoulTicketDetail;
  filteredTableDataArr: any;
  ticketDataArr = [];
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
}

catch (error) {
    CustomLogger.logStringWithObject("ERROR:", error);
    
}

  async ngOnInit() {
    await this.htmlInit() ;
  
    this.ogoulticketDetail = new OgoulTicketDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let ogoul_ticket_id = params["id"];
        if (ogoul_ticket_id) {
          let result = await this._dbService.getOgoulTicketing(ogoul_ticket_id).toPromise();
         // console.log(result);
          this.ogoulticketDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.ogoulticketDetail.files;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save Ticketing...", this.ticketDetail);
  
  /* this.ticketDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
 
  this.ticketDetail.modified_time = Date.now(); */
  try {
    let result = null;
   // CustomLogger.logStringWithObject("FILES:", this.file);
    if (this.file != undefined || this.file != null) {
      const formData = new FormData();
      formData.append('file', this.file);
      result = await this._dbService.uploadFile(formData).toPromise();
     // CustomLogger.logStringWithObject("uploadFile:result:", result);

      let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
     // CustomLogger.logStringWithObject("files:", fileName);
      this.ogoulticketDetail.files = fileName;

    }
  
    if (this.isUpdate){
    result = await this._dbService.updateOgoulTicketing(this.ogoulticketDetail).toPromise();
    }
else{
/* this.ticketDetail.created_by= this._dbService.getCurrentUserDetail().email;

      this.ticketDetail.created_time = Date.now(); */
result = await this._dbService.addOgoulTicketing(this.ogoulticketDetail).toPromise();
}
//CustomLogger.logStringWithObject("Ticketing:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Our team will contact you soon ");
else
    CustomMisc.showAlert("Ticketing Updated Successfully");
this._router.navigate(["/ogoul/ticketdetails"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in in Ticketing  : " + error.message, true);
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

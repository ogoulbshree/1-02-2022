import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveDetails } from 'src/app/models/ActiveDetails.model';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { CampaignDetail } from 'src/app/models/CampaignDetail.model';
import { CampaignstatusDetail } from 'src/app/models/CampaignstatusDetail.model';
import { CampaigntypeDetail } from 'src/app/models/CampaigntypeDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";



import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent extends DynamicComponent implements OnInit {

    
  campaignDetail: CampaignDetail;
  activityDetail: ActivityDetail;
  activeDetails: ActiveDetails[] =[];;
  campaigntypeDetail:CampaigntypeDetail[] =[];;
  campaignstatusDetail:CampaignstatusDetail[] =[];;
  isUpdate = false;
  CampaignDataArr = [];
  attachmenstsData:any
  rowsOnPage = 5;
  reverse: boolean = false;
  key: string = 'id';
  form: FormGroup;
  preview: string;
  invalid_file =true;
  file: any;
  notes: any[];
  
  attchment ={
    
    title: ''
  }

 
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
    public fb: FormBuilder, injector: Injector, @Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) { 
      super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS,injector);
      // Reactive Form
      this.form = this.fb.group({
       name: [''],
       files: [null]
     })
   }
   
   async htmlInit() {
    
    let result = await this._dbService.getAllCampaignActiveList().toPromise();
    this.activeDetails = result["data"];

{
    let result = await this._dbService.getAllCampaigntypeList().toPromise();
  this.campaigntypeDetail = result["data"];
} 
{
  let result = await this._dbService.getAllCampaignstatus().toPromise();
this.campaignstatusDetail = result["data"];
} 

}

catch (error) {
  CustomLogger.logStringWithObject("ERROR:", error);
}

  

   async init() {


   let result = await this._dbService.getObjectActivities(GlobalConstants.PARENT_ACTIVITY_CAMPAIGN).toPromise();
   }
    async ngOnInit() {
      await this.populateFields();
      await this.init(); 
      await this.htmlInit();
    this.campaignDetail = new CampaignDetail();

    this._activatedRoute.params.subscribe(
      async params => {
      //  console.log("params:", params);
        let campaign_id = params["id"];
        if (campaign_id) {
          let result = await this._dbService.getCampaign(campaign_id).toPromise();
         // console.log(result);
          this.campaignDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.campaignDetail.files;
          this._dbService.getCampaignnotes(this.campaignDetail.campaign_id).subscribe((notes:any) => {
          //  console.log(notes);
            this.notes = notes;
            if(!this.notes){
              this.notes = [];
            }
          });
      
    
        }
          else{
            this.isUpdate = false;
            this.notes = [];
            this.campaignDetail = new CampaignDetail();
          }
        
        let result = await this._dbService.getSpecificObjectActivities(this.campaignDetail.campaign_id).toPromise();
        //console.log("result:", result);
        this.activityDetail = result["data"];
      /*   this.filteredTableDataArr = this.activityDetail.object_id; */
            } 
           );
          
          }

    



  async onSubmit() 
  {
    this.campaignDetail.object_type = GlobalConstants.OBJECT_DETAIL_CAMPAIGN;
 //   CustomLogger.logStringWithObject("Will save Campaign...", this.campaignDetail);
    this.campaignDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
    this.campaignDetail.modified_time = Date.now();
    try {
      let result = null;
     
    
      if (this.isUpdate){
      result = await this._dbService.updateCampaign(this.campaignDetail).toPromise();
      }
  else
  {
  this.campaignDetail.created_by= this._dbService.getCurrentUserDetail().email;

  this.campaignDetail.created_time = Date.now();
  result = await this._dbService.addCampaign(this.campaignDetail).toPromise();
  }
 // CustomLogger.logStringWithObject("addedcampaign:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Campaign Added Successfully");
  else
      CustomMisc.showAlert("Campaign details Updated Successfully");
  this._router.navigate(["/marketing/campaignlist"]);

 
} 
catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Campaign details: " + error.message, true);
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
    
  save(){
    //get files 
    let fileList = this.file.files;
  
    //if more than one file
    if(fileList.length > 0) {
    
      //get the first file
      let file: File = fileList[0];
     
      //upload the file to save on db
      this._dbService.uploadNotes(file)
      .subscribe(
        (data: any) => {
          let fp = data.file_path;
          //create new object
          this.invalid_file = false;
          let obj = {
            title: this.attchment.title, 
            file_path: fp,
            size: file.size,
            campaign_id: this.campaignDetail.campaign_id,
            file_name: file.name, 
          }
          
          //reset values for form 
          this.attchment.title = undefined;
          this.file.value = '';
          
          this.invalid_file = true;
       
          //add new note object
          this._dbService.addNotes(obj).subscribe((res) => {
            this.notes = this.notes.concat(res);
          
          },
          error => {});
        },
        error => {}
        
      )
     
    }
    else{
      this.invalid_file = true;
    }
   
  }
  
  upload(event: Event){
    this.file = event.target as HTMLInputElement;
    this.invalid_file = false;
  }
  //download file from get request
  onClickDownload(obj){
    this._dbService.downloadFile(obj.file_path[0]).subscribe(
      (response: HttpResponse<Blob>) => {
  
        //get file data
        let binaryData = [];
        binaryData.push(response.body);
  
        //create new download link
        let downloadLink = document.createElement('a');
        //set url 
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        //set attribute
        downloadLink.setAttribute('download', obj.file_name);
        //append to body
        document.body.appendChild(downloadLink);
        //click link
        downloadLink.click();
      });
  }
  
  onClickDeletenote(obj){
    //delete notes from array
    this.notes.splice(this.notes.indexOf(obj),1);
  
    //send to db to delete
    this._dbService.deleteNotes(obj).toPromise().then(
      (res) => {},
        (err) => console.log(err),
    );
  }
  }

   
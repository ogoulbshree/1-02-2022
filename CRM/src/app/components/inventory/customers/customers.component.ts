import { HttpResponse } from '@angular/common/http';
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
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";

import { of } from "rxjs";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent extends DynamicComponent implements  OnInit {

 
  customerDetail: ObjectDetail;
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
  attachmenstsData;
  rowsOnPage = 5;
  accountpattern ="[a-zA-Z0-9 ]+"
 
  isValidFormSubmitted = false;
  invalid_file =true;
  file: any;
  notes: any[];
  
  attchment ={
    
    title: ''
  }
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,@Inject(LOCALE_ID) public locale: string,
    private toast: ToastrService,  private attacSrv: AttachmentService,public _uiservice:UiService, ) 
  {
      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_CUSTOMER,injector);
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
    let result = await this._dbService.getAllSource(1).toPromise();
  this.sourceDetail = result["results"];
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
    this.customerDetail = new ObjectDetail();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let object_id = params["id"];
        if (object_id) {
          let result = await this._dbService.getCustomer(object_id).toPromise();
         // console.log(result);
          this.customerDetail = result["data"];
          this.isUpdate = true;
          this.flagShowDefaultIcon = false;
        
    
         this._dbService.getNotes(this.customerDetail.object_id).subscribe((notes:any) => {
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
            this.customerDetail = new ObjectDetail();
          }
            let result = await this._dbService.getSpecificObjectActivities(this.customerDetail.object_id).toPromise();
       // console.log("result:", result);
        this.activityDetail = result["data"]; 
        })
      }
    
     
  
  showError = "";
    
  async onSubmit() {
   
  
    this.customerDetail.object_type = GlobalConstants.OBJECT_DETAIL_CUSTOMER;
      //CustomLogger.logStringWithObject("Will save Customer...", this.customerDetail);
  
      this.customerDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
     
      this.customerDetail.modified_time = Date.now();
  try {
        let result = null;
        if (this.isUpdate){
        result = await this._dbService.updateCustomer(this.customerDetail).toPromise();
        }
    else{
  
    this.customerDetail.created_by= this._dbService.getCurrentUserDetail().email;

    this.customerDetail.created_time = Date.now();
    this.customerDetail.object_id = Date.now();
    result = await this._dbService.addCustomer(this.customerDetail).toPromise();
    }
   // CustomLogger.logStringWithObject("addedCustomer:result:", result);
    if (!this.isUpdate)
        CustomMisc.showAlert("Customer Added Successfully");
    else
        CustomMisc.showAlert("Customer Updated Successfully");
    this._router.navigate(["/sales/customerlist"]);
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
  
 /*Upload File function (ONCHANGE)*/
/*  upload(event){

  this.file = event.target.files[0];
  console.log(event.target.files[0])
  this.attacSrv.saveimage(this.file).subscribe((data: any) => {
    this.attachments.file = data;
    console.log(this.attachments)
    this.attachments.size =  Math.round((this.file.size / 1024)) + 'KB';
    this.attachments.type =  this.file.type;
  });
}


saveAttachments(){
  this.attacSrv.create(this.attachments).subscribe((resp: any) => {
    this.attacSrv.getall().subscribe((res: any) => {
      this.attachmenstsData = res.data;
      this.attachments.title = '';
      this.attachments.file = '';
      document.getElementById('closeAttachment_Modal').click();
    });
  })
}


 deleteAttachments(id){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.attacSrv.delete(id).subscribe((resp: any) => {
        console.log(resp)
        this.attacSrv.getall().subscribe((res: any) => {
          this.attachmenstsData = res.data;
          console.log(this.attachmenstsData)
        });
        if (resp.message == 'success') {
          this.toast.success('Deleted Successfully' , '' ,{
            timeOut: 1000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
            progressAnimation: 'increasing'
          });
        } else {
          console.log('something went wrong')
        }
      })
    }
  });
}


attachFile(img){
this.attachmentFile = img;
}
download(file){
console.log(file);
var data = {filename: file};
this.attacSrv.download(data).subscribe(
  data => saveAs(data,file)
);
} */

onClickEdit(obj) {
  this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
}

async onClickDelete(obj) {
 //g console.log("will delete activity:::", obj);
  await this._dbService.deleteActivity(obj).toPromise();
  await this.init();
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
          object_id: this.customerDetail.object_id,
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
      (err) => {},
  );
}

}
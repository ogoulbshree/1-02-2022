import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';

import { NgbActiveModal,ModalDismissReasons ,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';

import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { environment } from 'src/environments/environment';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { AttachmentService } from 'src/app/services/attachment.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

import { saveAs } from 'file-saver';
import { UiService } from 'src/app/services/ui.service';


import { formatDate } from "@angular/common";
import { of } from "rxjs";


  
 
@Component({
  selector: 'app-ServiceCustomers',
  templateUrl: './ServiceCustomers.component.html',
  styleUrls: ['./ServiceCustomers.component.css']
})
export class ServiceCustomersComponent  extends DynamicComponent implements  OnInit {


  SERVER_URL = environment.SERVER_URL;
      
    customerDetail: ObjectDetail;
    
departmentDetail: DepartmentDetail[] = [];
sourceDetail: SourceDetail[] =[];
activityDetail: ActivityDetail[] = [];

    isUpdate = false;
    flagShowDefaultIcon = true;

    filteredTableDataArr: any;
    ALL_DELETE_ALLOWED = true;
    CAN_ADD = true;
    SHOW_ICONS = true;
    SHOW_EDIT_DELETE = true;
    
  file: any;
  attachmenstsData: any
  routerId: any;
  attachments = {
    title: '',
    lastmodyfied: '',
    size: '',
    type: '',
    file: '',
    ObjectDetail: '',
     
  }

  attachmentFile: any;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
    constructor( private _router: Router, private _activatedRoute: ActivatedRoute, @Inject(LOCALE_ID) public locale: string,injector: Injector,
      private toast: ToastrService,  private attacSrv: AttachmentService,
      public _uiservice: UiService) 
  {
      super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_CUSTOMER,injector);
    }
  
    async htmlInit() {
    
      let result = await this._dbService.getAllDepartment(1).toPromise();
      this.departmentDetail = result["results"];
  
  {
      let result = await this._dbService.getAllSource(1).toPromise();
    this.sourceDetail = result["results"];
  } 
 /*  this.attacSrv.getall().subscribe((res: any) => {
    this.attachmenstsData = res.data;
  }); */
  }
  
  catch (error) {
    CustomLogger.logStringWithObject("ERROR:", error);
  }
  

    async init() {
     /*
      if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_MANAGER) {
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = true;
        this.ALL_DELETE_ALLOWED = false;
      }
*/
  
    }
    
      async ngOnInit() {
        await this.htmlInit();
     await this.init();
     await this.populateFields();
      this.customerDetail = new ObjectDetail();
  
      this._activatedRoute.params.subscribe(
        async params => {
        //  console.log("params:", params);
          let object_id = params["id"];
          if (object_id) {
            let result = await this._dbService.getCustomer(object_id).toPromise();
          //  console.log(result);
            this.customerDetail = result["data"];
            this.isUpdate = true;
            this.flagShowDefaultIcon = false;
          }
          let result = await this._dbService.getSpecificObjectActivities(this.customerDetail.object_id).toPromise();
         // console.log("result:", result);
          this.activityDetail = result["data"];
        /*   this.filteredTableDataArr = this.activityDetail.object_id; */
              } 
             );
            
            }

            showError = "";

    async onSubmit() {
      this.customerDetail.object_type = GlobalConstants.OBJECT_DETAIL_CUSTOMER;
       // CustomLogger.logStringWithObject("Will save Customer...", this.customerDetail);
       /*  this.customerDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
        
      this.customerDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
      this.customerDetail.modified_time = Date.now();
    try {
          let result = null;
          if (this.isUpdate){
          result = await this._dbService.updateCustomer(this.customerDetail).toPromise();
          }
      else{
     /*  this.customerDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
     
   this.customerDetail.created_by= this._dbService.getCurrentUserDetail().email;
   this.customerDetail.created_time = Date.now();
   
      result = await this._dbService.addCustomer(this.customerDetail).toPromise();
      }
      //CustomLogger.logStringWithObject("addedCustomer:result:", result);
      if (!this.isUpdate)
          CustomMisc.showAlert("Customer Added Successfully");
      else
          CustomMisc.showAlert("Customer Updated Successfully");
      this._router.navigate(["/service/customerlist"]);
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
   upload(event){

    this.file = event.target.files[0];
   // console.log(event.target.files[0])
    this.attacSrv.saveimage(this.file).subscribe((data: any) => {
      this.attachments.file = data;
     // console.log(this.attachments)
      this.attachments.size =  Math.round((this.file.size / 1024)) + 'KB';
      this.attachments.type =  this.file.type;
    });
  }

  /*Save Attachment*/
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

   /*Delete Attachment*/
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
         // console.log(resp)
          this.attacSrv.getall().subscribe((res: any) => {
            this.attachmenstsData = res.data;
           // console.log(this.attachmenstsData)
          });
          if (resp.message == 'success') {
            this.toast.success('Deleted Successfully' , '' ,{
              timeOut: 1000,
              positionClass: 'toast-bottom-left',
              progressBar: true,
              progressAnimation: 'increasing'
            });
          } else {
           // console.log('something went wrong')
          }
        })
      }
    });
}

/*Get file that show in modal*/
attachFile(img){
  this.attachmentFile = img;
}
download(file){
 // console.log(file);
  var data = {filename: file};
  this.attacSrv.download(data).subscribe(
    data => saveAs(data,file)
  );
}


onClickEdit(obj) {
  this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
}

async onClickDelete(obj) {
  //console.log("will delete activity:::", obj);
  await this._dbService.deleteActivity(obj).toPromise();
  await this.init();
}
}
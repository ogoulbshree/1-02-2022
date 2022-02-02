import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';

import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { NgbActiveModal,ModalDismissReasons ,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FaqDetail } from 'src/app/models/FaqDetail.model';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-servicefaq',
  templateUrl: './servicefaq.component.html',
  styleUrls: ['./servicefaq.component.css']
})
export class ServicefaqComponent extends DynamicComponent implements OnInit {



      
    faqDetail: FaqDetail;
    isUpdate = false;
    flagShowDefaultIcon = true;

    filteredTableDataArr: any;
    ALL_DELETE_ALLOWED = true;
    CAN_ADD = true;
    SHOW_ICONS = true;
    SHOW_EDIT_DELETE = true;
    
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  
    constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,

      public _uiservice: UiService, @Inject(LOCALE_ID) public locale: string,) {
      super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_FAQ,injector);
    }
  
    
    async init() {
    
      if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ) {
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = true;
        this.ALL_DELETE_ALLOWED = false;
      }

  
    }
    
      async ngOnInit() {
        
     await this.init();
     await this.populateFields();
      this.faqDetail = new FaqDetail();
  
      this._activatedRoute.params.subscribe(
        async params => {
         // console.log("params:", params);
          let faq_id = params["id"];
          if (faq_id) {
            let result = await this._dbService.getFaqs(faq_id).toPromise();
           // console.log(result);
            this.faqDetail = result["data"];
            this.isUpdate = true;
            this.flagShowDefaultIcon = false;
          }
  
        } );
        
  
    }

    
    async onSubmit() {
    
      //  CustomLogger.logStringWithObject("Will save faq...", this.faqDetail);
    /*     this.faqDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.faqDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
        this.faqDetail.modified_time = Date.now();

    try {
          let result = null;
          if (this.isUpdate) {
          result = await this._dbService.updateFaqs(this.faqDetail).toPromise();
          }
      else {
        this.faqDetail.created_by= this._dbService.getCurrentUserDetail().email;
     /*    this.faqDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
          this.faqDetail.created_time = Date.now();
      result = await this._dbService.addFaqs(this.faqDetail).toPromise();
      }
    
     // CustomLogger.logStringWithObject("addedfaq:result:", result);
      if (!this.isUpdate)
          CustomMisc.showAlert("Faq Added Successfully");
      else
          CustomMisc.showAlert("Faq Updated Successfully");
      this._router.navigate(["/service/servicefaqlist"]);
    
     
    } 
    
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Faq: " + error.message, true);
    }    
    }
  }
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { NgbActiveModal,ModalDismissReasons ,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CaseDetail } from 'src/app/models/CaseDetail.model';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
selector: 'ServiceCases-component',
templateUrl: './ServiceCases.component.html',
styleUrls: ['./ServiceCases.component.css']
})
export class ServicecasesComponent  implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));

    caseDetail: CaseDetail;
    isUpdate = false;
    flagShowDefaultIcon = true;
    updateFlag = false;
    customer_keyword = "first_name";
    first_name:string;
    customers;
    filteredTableDataArr: any;
    ALL_DELETE_ALLOWED = true;
    CAN_ADD = true;
    SHOW_ICONS = true;
    SHOW_EDIT_DELETE = true;
    constructor(   @Inject(LOCALE_ID) public locale: string,private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
      public _uiservice: UiService) {
      
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
        
     
        this.updateFlag = this.isUpdate;
     await this.init();
      this.caseDetail = new CaseDetail();
  
      this._activatedRoute.params.subscribe(
        async params => {
          //console.log("params:", params);
          let case_id = params["id"];
          if (case_id) {
            let result = await this._dbService.getCases(case_id).toPromise();
          //  console.log(result);
            this.caseDetail = result["data"];
            this.isUpdate = true;
            this.flagShowDefaultIcon = false;
          }
  
        } );
        
        this._dbService.objgetAllCustomer(1).subscribe(res =>{
          if(res)
          this.customers = res["results"];
        });
    }
    async onSubmit() {
    
        //CustomLogger.logStringWithObject("Will save Cases...", this.caseDetail);
        this.caseDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
       
     /*    this.caseDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.caseDetail.modified_time = Date.now();
    try {
          let result = null;
          if (this.isUpdate){
          
          result = await this._dbService.updateCases(this.caseDetail).toPromise();
          }
      else{
      this.caseDetail.created_by= this._dbService.getCurrentUserDetail().email;
     /*  this.caseDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.caseDetail.created_time = Date.now();
      result = await this._dbService.addCases(this.caseDetail).toPromise();
      }
      //CustomLogger.logStringWithObject("addedCases:result:", result);
      if (!this.isUpdate)
          CustomMisc.showAlert("Cases Added Successfully");
      else
          CustomMisc.showAlert("Cases Updated Successfully");
      this._router.navigate(["/service/caselist"]);
    
     
    } 
    
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Cases: " + error.message, true);
    }    
    }
    

    // set the mobile and customer name on select of customer
 onCustomerSelect(customers){
  /*  this.quoteDetail.phone = customer.phone; */
  this.caseDetail = customers;
    this.first_name = customers.fist_name;
    this.caseDetail.object_id = customers.object_id;
    this.caseDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;
    
  }
  onChangeSearch(ev) {
 
  }
  onFocused(ev) {
 
  }
   
  }
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { CurrencyDetail } from 'src/app/models/CurrencyDetails.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
@Component({
  selector: 'app-returnproducts',
  templateUrl: './returnproducts.component.html',
  styleUrls: ['./returnproducts.component.css']
})
export class ReturnproductsComponent extends DynamicComponent implements OnInit {
  headerLabelValue = "AAA";
  labelProductName = "PRODUCT NAME";
 
  currencyDetail : CurrencyDetail;
  categoryDetail: CategoryDetail[] = [];
  stockDetail : ProductDetail;
  suppliernameDetail : SuppliernameDetail;
 
  file 
  
  form: FormGroup;
 
  preview: string;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice:UiService, public fb: FormBuilder,injector: Injector,@Inject(LOCALE_ID) public locale: string) {
      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_STOCK,injector) 
    // Reactive Form
    this.form = this.fb.group({
     name: [''],
     files: [null]
   })
 }
  isUpdate = false;

  async htmlInit() {
    
    let result = await this._dbService.getAllCategories().toPromise();
    this.categoryDetail = result["data"];
{

    
  let result = await this._dbService.getAllSuppliers().toPromise();
  this.suppliernameDetail = result["data"];
}
{

    
  let result = await this._dbService.getAllCurrencies().toPromise();
  this.currencyDetail = result["data"];
}
  }
  



async ngOnInit() {
    this.stockDetail = new ProductDetail();
   this.htmlInit();
   await this.populateFields();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let product_id = params["id"];
        if (product_id) {
          let result = await this._dbService.getProduct(product_id).toPromise();
         // console.log(result);
          this.stockDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.stockDetail.files;
          this.headerLabelValue = "UPPP";
        }

      }
    );
    

  }


  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save product...", this.productDetail);

    this.stockDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   /* 
    this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.stockDetail.modified_time = Date.now();
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
      this.stockDetail.files = fileName;

    }
  
      if (this.isUpdate){
      result = await this._dbService.updateProduct(this.stockDetail).toPromise();
      }
  else{
  this.stockDetail.created_by= this._dbService.getCurrentUserDetail().email;
 /*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.stockDetail.created_time = Date.now();
  result = await this._dbService.addProduct(this.stockDetail).toPromise();
  }
 // CustomLogger.logStringWithObject("addProduct:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Stock Added Successfully");
  else
      CustomMisc.showAlert("Stock Updated Successfully");
  this._router.navigate(["inventory/stocklist"]);
  this.showError = "";

} 
    
 catch (error) { 
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Stock: " + error.message, true);
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
}


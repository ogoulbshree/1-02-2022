import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UiService } from 'src/app/services/ui.service';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CurrencyDetail } from 'src/app/models/CurrencyDetails.model';
import { formatDate } from "@angular/common";

import { of } from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends DynamicComponent implements OnInit {

  headerLabelValue = "AAA";
  labelProductName = "PRODUCT NAME";
  productDetail : ProductDetail;
  currencyDetail : CurrencyDetail;
  categoryDetail: CategoryDetail[] = [];
  file 
  
  form: FormGroup;
  suppliernameDetail : SuppliernameDetail;
  preview: string;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice:UiService, public fb: FormBuilder,injector: Injector,@Inject(LOCALE_ID) public locale: string) {
      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_PRODUCT,injector) 
    // Reactive Form
    this.form = this.fb.group({
     name: [''],
     files: [null]
   })
 }
  isUpdate = false;

  async htmlInit() {
    
    let result = await this._dbService.getAllCategory(1).toPromise();
    this.categoryDetail = result["results"];
{

    
  let result = await this._dbService.getAllSuppliername(1).toPromise();
  this.suppliernameDetail = result["results"];
}
{

    
  let result = await this._dbService.getAllCurrency(1).toPromise();
  this.currencyDetail = result["results"];
}
  }
  



async ngOnInit() {
    this.productDetail = new ProductDetail();
   this.htmlInit();
   await this.populateFields();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let product_id = params["id"];
        if (product_id) {
          let result = await this._dbService.getProduct(product_id).toPromise();
         // console.log(result);
          this.productDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.productDetail.files;
          this.headerLabelValue = "UPPP";
        }

      }
    );
    

  }


  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save product...", this.productDetail);

    this.productDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   /* 
    this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.productDetail.modified_time = Date.now();
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
      this.productDetail.files = fileName;

    }
  
      if (this.isUpdate){
      result = await this._dbService.updateProduct(this.productDetail).toPromise();
      }
  else{
  this.productDetail.created_by= this._dbService.getCurrentUserDetail().email;
 /*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.productDetail.created_time = Date.now();
  result = await this._dbService.addProduct(this.productDetail).toPromise();
  }
 // CustomLogger.logStringWithObject("addProduct:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Product Added Successfully");
  else
      CustomMisc.showAlert("Product Updated Successfully");
  this._router.navigate(["sales/products/productslist"]);
  this.showError = "";

} 
catch (error) { 
  //CustomLogger.logError(error);
  CustomMisc.showAlert("Product already exist: please check and update the Unique product Name" );

   this.showError = error.error.message;
 }    
/* catch (error) { 
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Product: " + error.message, true);
}  */   

  }
  onClickForm() {
    this.productDetail.product_name = "";
    this.productDetail.category_name = "";
    this.productDetail.cost = 0;
    this.productDetail.supplier_name = "";
    
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


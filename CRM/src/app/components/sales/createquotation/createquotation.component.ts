import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { QuoteDetail } from 'src/app/models/QuoteDetail.model';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail} from 'src/app/models/ProductDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import {MatFormFieldControl} from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';

import { formatDate } from "@angular/common";

import { of } from "rxjs";
@Component({
  selector: 'app-createquotation',
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css'],
  //providers: [{provide: MatFormFieldControl, useExisting: MyTelInput}],
})
export class CreatequotationComponent extends DynamicComponent implements OnInit {

  ACTIVITY_OBJECT_TYPE = [GlobalConstants.PARENT_ACTIVITY_CUSTOMER, 
    GlobalConstants.PARENT_ACTIVITY_CONTACT, GlobalConstants.PARENT_ACTIVITY_LEAD];
  selectedActivityType;

  activityDetail: ActivityDetail;
  userControl = new FormControl();
  quoteDetail: QuoteDetail;
  categoryDetail: CategoryDetail[] = [];
  productDetail : ProductDetail[] =[]
  products;
  product_name;
  unitCost;
  product_keyword = 'product_name';
  customer_keyword = "first_name";
  first_name:string;
  customers;
  isUpdate = false;
  print =false;
  selectedProducts = new Array<any>();
  filteredProducts: Observable<any>;
  lastFilter: string = '';
  total_cost = 0;
  quantity = 1;
  discount = 0;
  displayValue: string;
  
  rowsOnPage = 5;
  p:number =1;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector, 
    @Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) {

    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_QUOTATION,injector);
   }
  updateFlag = false;
  
  printFlag = false;
  async htmlInit() {
    this._dbService.getAllCustomers().subscribe(res =>{
      if(res)
      this.customers = res["data"];
    });
    let result = await this._dbService.getAllCategories().toPromise();
  
   this.categoryDetail = result["data"]; 
  
 }
 catch(error) {
   CustomLogger.logStringWithObject("ERROR:", error);
 }

 async ngOnInit() {
   await this.htmlInit();
   this.updateFlag = this.isUpdate;
   this.printFlag = this.print
   this.quoteDetail = new QuoteDetail();
  
   await this.populateFields();
   let productResult = await this._dbService.getAllProductsList().toPromise();
   this.products = productResult["data"];
   //add properties to the product object, needs to be created a model for mapping
   this.products.forEach(element => {
     element.selected = false;
     element.quantity = 1;
     element.discount = 0;
   });
   // in case of update get the id of quota
   this._activatedRoute.params.subscribe(
     async params => {
       let quote_id = params["id"];
       if (quote_id) {
         let result = await this._dbService.getQuote(quote_id).toPromise();
         this.isUpdate = true;
         this.print = true;
         this.quoteDetail = result["data"];
         this.total_cost = this.quoteDetail.total_cost;
         this.quoteDetail.object_id;

         // set the saved values of products name in multiselect
         this.quoteDetail.product_name.forEach(element => {
           this.products.forEach(el => {
             if(el.product_name == element.product_name){
               el.quantity = element.quantity;
               el.discount = element.discount;
               el.product_Total = element.product_Total;
               this.toggleSelection(el);
             }
           });
         });
       }
     }
   );
   

   //on search in product name, filter the result
   this.filteredProducts = this.userControl.valueChanges.pipe(
     startWith<string | any>(''),
     map(value => typeof value === 'string' ? value : this.lastFilter),
     map(filter => this.filter(filter))
   );
 }

 async onSubmit() {
  // CustomLogger.logStringWithObject("Will save quotation...", this.quoteDetail);
   this.quoteDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  /*  this.quoteDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
   this.quoteDetail.modified_time = Date.now();
   try {
     let result = null;
     if (this.isUpdate) {
      /*  this.quoteDetail.product_name = this.selectedProducts;
       this.quoteDetail.total_cost = this.total_cost; */
       result = await this._dbService.updateQuote(this.quoteDetail).toPromise();
     }
     else {
      /*  this.quoteDetail.product_name = this.selectedProducts;
       this.quoteDetail.total_cost = this.total_cost; */

      
       this.quoteDetail.created_by= this._dbService.getCurrentUserDetail().email;
      /*  this.quoteDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
       this.quoteDetail.created_time = Date.now();
       let newQuotation = new QuoteDetail();
      
       newQuotation.quote_id = this.quoteDetail.quote_id;
       newQuotation.first_name = this.quoteDetail.first_name;
       newQuotation.activity_type = this.quoteDetail.activity_type;
       newQuotation.mobile = this.quoteDetail.mobile;
       newQuotation.object_id = this.quoteDetail.object_id;
       newQuotation.product_name = this.quoteDetail.product_name;
       newQuotation.quotation_date = this.quoteDetail.quotation_date;
       newQuotation.created_by = this.quoteDetail.created_by;
       newQuotation.updated_by = this.quoteDetail.updated_by;
       newQuotation.modified_time = this.quoteDetail.modified_time;
       newQuotation.created_time = this.quoteDetail.created_time;
       result = await this._dbService.addQuote(newQuotation).toPromise();
     }
    // CustomLogger.logStringWithObject("addQuotation:result:", result);
     if (!this.isUpdate) {
       CustomMisc.showAlert("Quotation Added Successfully");

     }
     else 
       CustomMisc.showAlert("Quotation Updated Successfully");
       this._router.navigate(["sales/quotationlist"]);
   

   }
   catch (error) {
     CustomLogger.logError(error);
     CustomMisc.showAlert("Error in adding Quotation: " + error.message, true);
   }

 }
 // set the mobile and customer name on select of customer
 onCustomerSelect(customer){
 /*  this.quoteDetail.phone = customer.phone; */
 this.quoteDetail = customer;
   this.first_name = customer.fist_name;
   this.quoteDetail.object_id = customer.object_id;
   this.quoteDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;
   
 }
 onChangeSearch(ev) {

 }
 onFocused(ev) {

 }

 filter(filter: string): any {
  this.lastFilter = filter;
  if (filter) {
    return this.products.filter(option => {
      return option.product_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
       
    })
  } else {
    return this.products.slice();
  }
}
//bind the selected value of dropdown, and show the selected text of productname
displayFn(value: any | string): string | undefined {
  if (Array.isArray(value)) {
    value.forEach((product, index) => {
      if (index === 0) {
        this.displayValue = product.product_name;
      } else {
        this.displayValue += ', ' + product.product_name;
      }
    });
  } else {
    this.displayValue = value;
  }
  return  this.displayValue;
}

optionClicked(event: Event, product: any) {
  event.stopPropagation();
  this.toggleSelection(product);
}

//toggle checkbox and selections of product
toggleSelection(product: any) {
  product.selected = !product.selected;
  if (product.selected) {
    if(!this.isUpdate){
      product.product_Total = product.cost;
      
    }
    this.selectedProducts.push(product);
  } else {
    const i = this.selectedProducts.findIndex(value => (value.product_name === product.product_name));
    this.selectedProducts.splice(i, 1);
  }

  this.userControl.setValue(this.selectedProducts);
  this.total_cost =this.gettotal_cost();
}

//on change of product quantity, update corresponding values
onChangeProductQnt(index, ev){
  this.selectedProducts[index].quantity = ev.target.value;
  this.selectedProducts[index].product_Total = (this.selectedProducts[index].cost * ev.target.value)-(this.selectedProducts[index].cost * ev.target.value * this.selectedProducts[index].discount/100);
  this.total_cost =  this.gettotal_cost();
}

//on change of product discount, update corresponding values
onChangeProductDiscount(index, ev){
  this.selectedProducts[index].discount = ev.target.value;
  let total = this.selectedProducts[index].cost * this.selectedProducts[index].quantity;
  this.selectedProducts[index].product_Total = total -total * ev.target.value/100;
  this.total_cost =this.gettotal_cost();
  
}

//get the total cost based on quantity and discounts of all added products
gettotal_cost() {
 // console.log("Total cost...");
  //console.log(this.selectedProducts);
  return this.selectedProducts.reduce((a, b) => a + (b['product_Total'] || 0), 0);
}



exportToPrint()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0; 
     
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Quotationlist.pdf'); // Generated PDF   
    });  
  } 
  onClickForm() {
  /*   this.quoteDetail.customer_name = "";
    this.quoteDetail.mobile = ""; */
    this.quoteDetail.quotation_date = "";
    this.quoteDetail.product_name = "";
   
}
key: string = 'id'
reverse :boolean =false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
}






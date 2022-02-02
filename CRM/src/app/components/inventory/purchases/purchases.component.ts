import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

import * as jspdf from 'jspdf'; 
import { map, startWith } from 'rxjs/operators';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { PurchaseDetail } from 'src/app/models/PurchaseDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { WarehouseDetail } from 'src/app/models/WarehouseDetail.model';
import { formatDate } from "@angular/common";

import { of } from "rxjs";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent  extends DynamicComponent implements OnInit {

  userControl = new FormControl();
  purchaseDetail: PurchaseDetail;
  categoryDetail: CategoryDetail[] = [];
  productDetail : ProductDetail[] =[]
  products;
  product_name;
  unitCost;
  product_keyword = 'product_name';
  supplier_keyword = "supplier_name";
  supplier_name:string;
  suppliers;
  isUpdate = false;
  print =false;
  selectedProducts = new Array<any>();
  filteredProducts: Observable<any>;
  lastFilter: string = '';
  total_cost = 0;
  quantity = 1;
  discount = 0;
  displayValue: string;
  warehouseDetail : WarehouseDetail;
  
  rowsOnPage = 5;
  p:number =1;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector, @Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) 
    { 

      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_PURCHASE,injector) 
    }
  updateFlag = false;
  
  printFlag = false;

  async htmlInit() {
    this._dbService.getAllSuppliers().subscribe(res =>{
      if(res)
      this.suppliers = res["data"];
    });
 
   let result = await this._dbService.getAllWareHouses().toPromise();
  
   this.warehouseDetail = result["data"]; 
  
 
}
 catch(error) {
   CustomLogger.logStringWithObject("ERROR:", error);
 }

 async ngOnInit() {
   this.htmlInit();
 
   await this.populateFields();
   this.updateFlag = this.isUpdate;
   this.printFlag = this.print
   this.purchaseDetail = new PurchaseDetail();
   
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
       let purchase_id = params["id"];
       if (purchase_id) {
         let result = await this._dbService.getPurchases(purchase_id).toPromise();
         this.isUpdate = true;
         this.print = true;
         this.purchaseDetail = result["data"];
         this.total_cost = this.purchaseDetail.total_cost;
         this.purchaseDetail.supplier_id;

         // set the saved values of products name in multiselect
         this.purchaseDetail.product_name.forEach(element => {
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

 stockCheck=async ()  => {
  for(let [i,k] of this.purchaseDetail.product_name.entries())
  {
    let stock:any = await this._dbService.SupplierStockCheck(k.product_id,k.quantity,"addPurchase").toPromise();
    if(i+1 == this.purchaseDetail.product_name.length)
    return stock
  }
 }

 async onSubmit() {
  // CustomLogger.logStringWithObject("Will save quotation...", this.purchaseDetail);
   this.purchaseDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  /*  this.purchaseDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
   this.purchaseDetail.modified_time = Date.now();
   this.stockCheck().then(async (x:any) => {})
   try {
     let result = null;
     if (this.isUpdate) {
      /*  this.purchaseDetail.product_name = this.selectedProducts;
       this.purchaseDetail.total_cost = this.total_cost; */
       result = await this._dbService.updatePurchases(this.purchaseDetail).toPromise();
     }
     else {
      /*  this.purchaseDetail.product_name = this.selectedProducts;
       this.purchaseDetail.total_cost = this.total_cost; */

      
       this.purchaseDetail.created_by= this._dbService.getCurrentUserDetail().email;
      /*  this.purchaseDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
       this.purchaseDetail.created_time = Date.now();
       let newPurchaseDetail = new PurchaseDetail();
      
       newPurchaseDetail.purchase_id = this.purchaseDetail.purchase_id;
       newPurchaseDetail.activity_type = this.purchaseDetail.activity_type;
       newPurchaseDetail.mobile = this.purchaseDetail.mobile;
       newPurchaseDetail.supplier_id = this.purchaseDetail.supplier_id;
       newPurchaseDetail.product_name = this.purchaseDetail.product_name;
       newPurchaseDetail.warehouse_name= this.purchaseDetail.warehouse_name;
       newPurchaseDetail.purchases_date = this.purchaseDetail.purchases_date;
       newPurchaseDetail.created_by = this.purchaseDetail.created_by;
       newPurchaseDetail.updated_by = this.purchaseDetail.updated_by;
       newPurchaseDetail.modified_time = this.purchaseDetail.modified_time;
       newPurchaseDetail.created_time = this.purchaseDetail.created_time;
       result = await this._dbService.addPurchases(newPurchaseDetail).toPromise();
     }
    // CustomLogger.logStringWithObject("addQuotation:result:", result);
     if (!this.isUpdate) {
       CustomMisc.showAlert("Purchases Added Successfully");

     }
     else 
       CustomMisc.showAlert("Purchases Updated Successfully");
       this._router.navigate(["/inventory/purchaseslist"]);
   

   }
   catch (error) {
     CustomLogger.logError(error);
     CustomMisc.showAlert("Error in adding purchase: " + error.message, true);
   }

 }
 // set the mobile and customer name on select of customer
 onSupplierSelect(supplier){
 /*  this.purchaseDetail.phone = customer.phone; */
 this.purchaseDetail = supplier;
   this.supplier_name = supplier.supplier_name;
   this.purchaseDetail.supplier_id = supplier.supplier_id;
 
   
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
      pdf.save('Purchaselist.pdf'); // Generated PDF   
    });  
  } 
 
key: string = 'id'
reverse :boolean =false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
}






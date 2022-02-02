import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'; 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { InvoiceDetails } from 'src/app/models/InvoiceDetails.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";

import { of } from "rxjs";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends DynamicComponent implements OnInit {

  activityDetail: ActivityDetail;
  userControl = new FormControl();
  invoiceDetail: InvoiceDetails;
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
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
    injector: Injector,@Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) {
      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_INVOICE,injector); 

  }

   /*  super(GlobalConstants.SALES_COMPONENT_NAME.SALES_,injector);
   } */
  updateFlag = false;
  
  printFlag = false;
  async htmlInit() {
    this._dbService.getAllCustomers().subscribe(res =>{
      if(res)
      this.customers = res["data"];
    });
    let result = await this._dbService.getAllCategory(1).toPromise();
  
   this.categoryDetail = result["results"]; 
  
 }
 catch(error) {
   CustomLogger.logStringWithObject("ERROR:", error);
 }

 async ngOnInit() {
  this.htmlInit();
  await this.populateFields();
   this.updateFlag = this.isUpdate;
   this.printFlag = this.print
   this.invoiceDetail = new InvoiceDetails();
   
 /*   await this.populateFields(); */
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
       let invoice_id = params["id"];
       if (invoice_id) {
         let result = await this._dbService.getInvoice(invoice_id).toPromise();
         this.isUpdate = true;
         this.print = true;
         this.invoiceDetail = result["data"];
         this.total_cost = this.invoiceDetail.total_cost;
         this.invoiceDetail.object_id;

         // set the saved values of products name in multiselect
         this.invoiceDetail.product_name.forEach(element => {
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
  for(let [i,k] of this.selectedProducts.entries())
  {
    let stock:any = await this._dbService.checkStock(k.product_id,k.quantity,"invoice").toPromise();
    if(i+1 == this.selectedProducts.length)
    return stock
    
  }
 }


 async onSubmit() {

  this.stockCheck().then(async (x:any) => {
    if(x.data.status)
    {
     

   this.invoiceDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  /*  this.invoiceDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
   this.invoiceDetail.modified_time = Date.now();
   try {
     let result = null;
     if (this.isUpdate) {
      /*  this.invoiceDetail.product_name = this.selectedProducts;
       this.invoiceDetail.total_cost = this.total_cost; */
       result = await this._dbService.updateInvoice(this.invoiceDetail).toPromise();
     }
     else {
      /*  this.invoiceDetail.product_name = this.selectedProducts;
       this.invoiceDetail.total_cost = this.total_cost; */

      
       this.invoiceDetail.created_by= this._dbService.getCurrentUserDetail().email;
      /*  this.invoiceDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
       this.invoiceDetail.created_time = Date.now();
       let newQuotation = new InvoiceDetails();
      
       newQuotation.invoice_id = this.invoiceDetail.invoice_id;
       newQuotation.activity_type = this.invoiceDetail.activity_type;
       newQuotation.object_id = this.invoiceDetail.object_id;
       newQuotation.customer_name = this.invoiceDetail.customer_name;
       newQuotation.product_name = this.invoiceDetail.product_name;
       newQuotation.date = this.invoiceDetail.date;
       newQuotation.quantity=this.invoiceDetail.quantity;
       newQuotation.product_category=this.invoiceDetail.product_category;
       newQuotation.product_discount=this.invoiceDetail.product_discount;
       newQuotation.product_actual_price=this.invoiceDetail.product_actual_price;
       newQuotation.total_cost=this.invoiceDetail.total_cost;
       newQuotation.product_total_price=this.invoiceDetail.product_total_price;
        
       newQuotation.created_by = this.invoiceDetail.created_by;
       newQuotation.updated_by = this.invoiceDetail.updated_by;
       newQuotation.modified_time = this.invoiceDetail.modified_time;
       newQuotation.created_time = this.invoiceDetail.created_time;
       result = await this._dbService.addInvoice(newQuotation).toPromise();
     }
    // CustomLogger.logStringWithObject("addQuotation:result:", result);
     if (!this.isUpdate) {
       CustomMisc.showAlert("Invoice Added Successfully");

     }
     else 
       CustomMisc.showAlert("Invoice Updated Successfully");
       this._router.navigate(["inventory/invoicelist"]);
   

   }
   catch (error) {
     CustomLogger.logError(error);
     CustomMisc.showAlert("Error in adding inventory: " + error.message, true);
   }
    }
    else{
      if(x.data.productCount == "0")
      CustomMisc.showAlert("Product "+ x.data.productName + " is out of stock."+" Please check with supplier");
      else
      CustomMisc.showAlert("Product "+ x.data.productName + " is available only "+x.data.productCount+" quantity. Please check with supplier" );
      // console.log("nuu",x)
    }
  })
  
 }
 // set the mobile and customer name on select of customer
 onCustomerSelect(customer){
 /*  this.invoiceDetail.phone = customer.phone; */
 this.invoiceDetail = customer;
   this.first_name = customer.fist_name;
   this.invoiceDetail.object_id = customer.object_id;
   this.invoiceDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;
   
 }
 onChangeSearch(ev) {

 }
 onFocused(ev) {

 }

 filter(filter: string): any {
  this.lastFilter = filter;
  // console.log("Ia m ",filter);
  
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

  // console.log("index",index,ev,this.selectedProducts[index].product_id);



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
 
key: string = 'id'
reverse :boolean =false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
}





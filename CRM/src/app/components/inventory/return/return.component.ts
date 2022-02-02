
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

import * as jspdf from 'jspdf';
import { map, startWith } from 'rxjs/operators';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { WarehouseDetail } from 'src/app/models/WarehouseDetail.model';
import { ReturnDetail } from 'src/app/models/ReturnDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { InvoiceDetails } from 'src/app/models/InvoiceDetails.model';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent extends DynamicComponent implements OnInit {
  ACTIVITY_OBJECT_TYPE = ["customer", "supplier"
  ];
  myInvoices: any;
  myPurchases:any;
  InitialCountPurchased;
  selectedInvoiceItem:any;
  selectedPurchaseItem: any;
   
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  customerDetail: any;
  supplierDetail: any;
  constructor(public _dbService:DBService,private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,@Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) {

    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_RETURN, injector)
  }

  userControl = new FormControl();
  returnDetail: ReturnDetail;
  categoryDetail: CategoryDetail[] = [];
  productDetail: ProductDetail[] = []
  products;
  product_name;
  unitCost;
  product_keyword = 'product_name';
  supplier_keyword = "supplier_name";
  customer_keyword = "first_name";
  supplier_name: string;
  first_name: string
  return_type: string;
  suppliers;
  customers;

  isUpdate = false;
  print = false;
  selectedProducts = new Array<any>();
  filteredProducts: Observable<any>;
  lastFilter: string = '';
  total_cost = 0;
  quantity = 1;
  discount = 0;
  displayValue: string;
  warehouseDetail: WarehouseDetail;
  updateFlag = false;
  selectedActivityType;
  printFlag = false;
  rowsOnPage = 5;
  p: number = 1;

  async htmlInit() {

    let result = await this._dbService.getAllCategory(1).toPromise();
    this.categoryDetail = result["results"];
    {let result = await this._dbService.getAllCustomers().toPromise();
    this.customerDetail = result["data"];}
    {let result = await this._dbService.getAllSuppliers().toPromise();
      this.supplierDetail = result["data"];}

    {
      let result = await this._dbService.getAllWarehouse(1).toPromise();

      this.warehouseDetail = result["results"];
    }

  }
  catch(error) {
    CustomLogger.logStringWithObject("ERROR:", error);
  }

  getCustomerName(id){
    this.customerDetail.map(item => {
      if(item.object_id == id)
      return item.first_name
    })
  }
  getSupplierName(id){
    this.supplierDetail.map(item => {
      if(item.supplier_id == id)
      return item.supplier_name
    })
  }

  async ngOnInit() {
    await this.populateFields();
    this.updateFlag = this.isUpdate;
    this.printFlag = this.print
    this.returnDetail = new ReturnDetail();
    this.htmlInit();

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
        let return_id = params["id"];
        // console.log(" params", params["id"]);
        if (return_id) {
          let result = await this._dbService.getReturns(return_id).toPromise();
          this.isUpdate = true;
          this.print = true;
          this.returnDetail = result["data"];
          // console.log(this.returnDetail);
          this.total_cost = this.returnDetail.total_cost;
          this.returnDetail.return_id;
          if(this.returnDetail.purchase_id != undefined ) {
            this._dbService.getPurchases(this.returnDetail.purchase_id).subscribe((x:any)=>{
              if (x) {
                this.selectedPurchaseItem= JSON.parse(JSON.stringify(x.data));
                // console.log("this.selectedPurchaseItem",this.selectedPurchaseItem);
              }
            })
          }
          else{
            this._dbService.getInvoice(this.returnDetail.invoice_id).subscribe((x:any)=>{
              if (x) {
                this.selectedInvoiceItem= JSON.parse(JSON.stringify(x.data));
              }
            })
          }

          // set the saved values of products name in multiselect
          this.returnDetail.product_name.forEach(element => {
            this.products.forEach(el => {
              if (el.product_name == element.product_name) {
                el.quantity = element.quantity;
                el.discount = element.discount;
                el.product_Total = element.product_Total;
                el.product_returned_count = element.product_returned_count;
                this.toggleSelection(el);
              }
            });
          });
        }
      }
    );
    this._dbService.getAllSuppliers().subscribe(res => {
      if (res)
        this.suppliers = res["data"];
    });
    this._dbService.getAllCustomers().subscribe(res => {
      if (res)
        this.customers = res["data"];
      // console.log("this.customers", this.customers)
    });

    //on search in product name, filter the result
    this.filteredProducts = this.userControl.valueChanges.pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  selectObject() {
    if (this.selectedActivityType == 'customer') {

      this.customers.first_name = "";

    }
    else {
      this.suppliers.supplier_name = "";
    }
  }

  checkReturnCount(id){
    let count,errorFlag:boolean = false,returnedValue=[];
    if(id == "customer"){
      this.selectedInvoiceItem.product_name.find((item,index) => {
         count = Number(item.product_returned_count)+ Number(this.selectedProducts[index].quantity);
         
          if (Number( count) > Number(item.quantity) ){
            CustomMisc.showAlert(`Please Check the ${item.product_name} quantity to be returned`);
           errorFlag=true;
           return
          }
          else
          returnedValue.push(count)
          
     })
     if(errorFlag)
     return false
     else 
     {
      returnedValue.forEach((x,index)=>{
        this.selectedProducts[index].product_returned_count = x;
        this.selectedInvoiceItem.product_name[index].product_returned_count = x;
      })
      return true
     }
     
    }
    else{
      this.selectedPurchaseItem.product_name.find((item,index) => {
         count = Number(item.product_returned_count)+ Number(this.selectedProducts[index].quantity);
          if (Number( count) > Number(item.quantity)){
            CustomMisc.showAlert(`Please Check the ${item.product_name} quantity to be returned`);
           errorFlag=true;
           return
          }
          else
          returnedValue.push(count)
          
     })
     if(errorFlag)
     return false
     else 
     {
      returnedValue.forEach((x,index)=>{
        this.selectedProducts[index].product_returned_count = x;
        this.selectedPurchaseItem.product_name[index].product_returned_count = x;
      })
      return true
     }
     
    }
    
  }



    async onSubmit() {
    if(this.selectedActivityType == 'customer' || this.returnDetail.invoice_id){

       if(this.checkReturnCount("customer")){
        this.selectedProducts.map((product) => {
                this._dbService.checkStock(product.product_id, product.quantity, "return").subscribe(x => {
                  // console.log(x)
                })
              })
         
        let temp = await this._dbService.updateInvoice(this.selectedInvoiceItem).toPromise();
        this.returnDetail.updated_by = this._dbService.getCurrentUserDetail().email;
        /*  this.purchaseDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.returnDetail.modified_time = Date.now();
        try {
          let result = null;
          if (this.isUpdate) {
            /*  this.purchaseDetail.product_name = this.selectedProducts;
             this.purchaseDetail.total_cost = this.total_cost; */
            result = await this._dbService.updateReturns(this.returnDetail).toPromise();
          }
          else {
            /*  this.purchaseDetail.product_name = this.selectedProducts;
             this.purchaseDetail.total_cost = this.total_cost; */
  
  
            this.returnDetail.created_by = this._dbService.getCurrentUserDetail().email;
            /*  this.purchaseDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
            this.returnDetail.created_time = Date.now();
            let newQuotation = new ReturnDetail();
  
            newQuotation.return_id = this.returnDetail.return_id;
            newQuotation.activity_type = this.returnDetail.activity_type;
            newQuotation.warehouse_name = this.returnDetail.warehouse_name;
            newQuotation.mobile = this.returnDetail.mobile;
            newQuotation.supplier_id = this.returnDetail.supplier_id;
            newQuotation.product_name = this.selectedProducts;
            newQuotation.returns_date = this.returnDetail.returns_date;
            newQuotation.created_by = this.returnDetail.created_by;
            newQuotation.updated_by = this.returnDetail.updated_by;
            newQuotation.modified_time = this.returnDetail.modified_time;
            newQuotation.created_time = this.returnDetail.created_time;
            newQuotation.object_id = this.returnDetail.object_id;
            newQuotation.purchase_id  = this.returnDetail.purchase_id;
            newQuotation.invoice_id  = this.returnDetail.invoice_id
            // console.log("I am ", newQuotation);
  
            result = await this._dbService.addReturns(newQuotation).toPromise();
          }
          // CustomLogger.logStringWithObject("addQuotation:result:", result);
          if (!this.isUpdate) {
            CustomMisc.showAlert("Return Added Successfully");
  
          }
          else
            CustomMisc.showAlert("Return Updated Successfully");
          this._router.navigate(["/inventory/returnlist"]);
  
  
        }
        catch (error) {
          CustomLogger.logError(error);
          CustomMisc.showAlert("Error in adding purchase: " + error.message, true);
        }
       }
      
      
    }
    else{
     
      if(this.checkReturnCount("supplier")){
       
          this.selectedProducts.map((product) => {
            this._dbService.SupplierStockCheck(product.product_id, product.quantity, "return").subscribe(x => {
              // console.log(x)
            })
          })
       
  
        let temp = await this._dbService.updatePurchases(this.selectedPurchaseItem).toPromise();
        this.returnDetail.updated_by = this._dbService.getCurrentUserDetail().email;
        /*  this.purchaseDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.returnDetail.modified_time = Date.now();
        try {
          let result = null;
          if (this.isUpdate) {
            /*  this.purchaseDetail.product_name = this.selectedProducts;
             this.purchaseDetail.total_cost = this.total_cost; */
            result = await this._dbService.updateReturns(this.returnDetail).toPromise();
          }
          else {
            /*  this.purchaseDetail.product_name = this.selectedProducts;
             this.purchaseDetail.total_cost = this.total_cost; */
  
  
            this.returnDetail.created_by = this._dbService.getCurrentUserDetail().email;
            /*  this.purchaseDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
            this.returnDetail.created_time = Date.now();
            let newQuotation = new ReturnDetail();
  
            newQuotation.return_id = this.returnDetail.return_id;
            newQuotation.activity_type = this.returnDetail.activity_type;
            newQuotation.warehouse_name = this.returnDetail.warehouse_name;
            newQuotation.mobile = this.returnDetail.mobile;
            newQuotation.supplier_id = this.returnDetail.supplier_id;
            newQuotation.product_name = this.selectedProducts;
            newQuotation.returns_date = this.returnDetail.returns_date;
            newQuotation.created_by = this.returnDetail.created_by;
            newQuotation.updated_by = this.returnDetail.updated_by;
            newQuotation.modified_time = this.returnDetail.modified_time;
            newQuotation.created_time = this.returnDetail.created_time;
            newQuotation.object_id = this.returnDetail.object_id;
            newQuotation.purchase_id  = this.returnDetail.purchase_id;
            newQuotation.invoice_id  = this.returnDetail.invoice_id
            // console.log("I am ", newQuotation);
  
            result = await this._dbService.addReturns(newQuotation).toPromise();
          }
          // CustomLogger.logStringWithObject("addQuotation:result:", result);
          if (!this.isUpdate) {
            CustomMisc.showAlert("Return Added Successfully");
  
          }
          else
            CustomMisc.showAlert("Return Updated Successfully");
          this._router.navigate(["/inventory/returnlist"]);
  
  
        }
        catch (error) {
          CustomLogger.logError(error);
          CustomMisc.showAlert("Error in adding purchase: " + error.message, true);
        }
    }
     
    }
  }
  // set the mobile and customer name on select of customer
  onSupplierSelect(supplier) {
    /*  this.purchaseDetail.phone = customer.phone; */
    this.returnDetail = supplier;
    this.returnDetail.activity_type = "supplier";
    this.supplier_name = supplier.supplier_name;
    this.returnDetail.supplier_id = supplier.supplier_id;
    this.fetchPurchase(supplier.supplier_id)
    // console.log(this.returnDetail)

  }
  onCustomerSelect(customer) {
    /*  this.purchaseDetail.phone = customer.phone; */
    this.returnDetail = customer;
    this.returnDetail.activity_type = "customer";
    this.first_name = customer.first_name;
    this.returnDetail.object_id = customer.object_id;
    this.fetchInvoices(customer.object_id)
    // console.log("this.returnDetail", this.returnDetail)

  }
  fetchInvoices(id) {
    this._dbService.fetchInvoices(id).subscribe((invoice: any) => {
      // console.log(invoice, "invoice");
      if (invoice) {
        this.myInvoices = invoice.data;
      }
    })
  }

  fetchPurchase(id){
    this._dbService.fetchPurchases(id).subscribe((purchase: any) => {
      if (purchase) {
        this.myPurchases = purchase.data;
      }
    })
  }
  selectedInvoice1(evt) {
    let invoice = this.myInvoices.find(x => x.invoice_id == evt.target.value);
     this.returnDetail.invoice_id = invoice.invoice_id;
    // console.log("I ", invoice)
    if (invoice) {
      this.selectedInvoiceItem = JSON.parse(JSON.stringify(invoice));
      this.selectedProducts = [...invoice.product_name];
      this.selectedProducts.map((product: any) => {
        this.total_cost += product.product_Total;
      })
    }

  }

  selectedPurchase(evt) {
    let purchase = this.myPurchases.find(x => x.purchase_id == evt.target.value);
    this.returnDetail.purchase_id = purchase.purchase_id;
    if (purchase) {
      this.selectedPurchaseItem= JSON.parse(JSON.stringify(purchase));
      this.selectedProducts = [...purchase.product_name];
      this.selectedProducts.map((product: any) => {
        this.total_cost += product.product_Total;
      })
    }

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
    return this.displayValue;
  }

  optionClicked(event: Event, product: any) {
    event.stopPropagation();
    this.toggleSelection(product);
  }

  //toggle checkbox and selections of product
  toggleSelection(product: any) {
    // product.selected = !product.selected;
    // if (product.selected) {
    if (!this.isUpdate) {
      product.product_Total = product.cost;

    }
    this.selectedProducts.push(product);
    // } else {
    //   const i = this.selectedProducts.findIndex(value => (value.product_name === product.product_name));
    //   this.selectedProducts.splice(i, 1);
    // }

    this.userControl.setValue(this.selectedProducts);
    this.total_cost = this.gettotal_cost();
  }

  //on change of product quantity, update corresponding values
  onChangeProductQnt(index, ev) {
    this.selectedProducts[index].quantity = ev.target.value;
    this.selectedProducts[index].product_Total = (this.selectedProducts[index].cost * ev.target.value) - (this.selectedProducts[index].cost * ev.target.value * this.selectedProducts[index].discount / 100);
    this.total_cost = this.gettotal_cost();
  }

  //on change of product discount, update corresponding values
  onChangeProductDiscount(index, ev) {
    this.selectedProducts[index].discount = ev.target.value;
    let total = this.selectedProducts[index].cost * this.selectedProducts[index].quantity;
    this.selectedProducts[index].product_Total = total - total * ev.target.value / 100;
    this.total_cost = this.gettotal_cost();

  }

  return

  //get the total cost based on quantity and discounts of all added products
  gettotal_cost() {
    // console.log("Total cost...");
    //console.log(this.selectedProducts);
    return this.selectedProducts.reduce((a, b) => a + (b['product_Total'] || 0), 0);
  }



  exportToPrint() {
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
      pdf.save('returnlist.pdf'); // Generated PDF   
    });
  }

  key: string = 'id'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}


import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealDetail } from 'src/app/models/DealDetail.model';
import { LeadsourceDetail } from 'src/app/models/LeadsourceDetail.model';
import { PipelineDetail } from 'src/app/models/PipelineDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { SalesstageDetail } from 'src/app/models/SalesStageDetail.model';
import { Observable } from 'rxjs';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { StatusDetail } from 'src/app/models/StatusDetail.model';
import { SalesstatusDetail } from 'src/app/models/Salesstatus.model';

import { formatDate } from "@angular/common";

import { of } from "rxjs";

@Component({
  selector: 'app-salesdeals',
  templateUrl: './salesdeals.component.html',
  styleUrls: ['./salesdeals.component.css']
})
export class SalesdealsComponent extends DynamicComponent implements OnInit {

  p: number = 1;
  dealDetail: DealDetail;
  isUpdate = false;

  flagShowDefaultIcon = true;
  pipelineDetail: PipelineDetail[] = [];
  salesstageDetail: SalesstageDetail[] = [];

  userDetail: UserDetail[] = [];
  leadsourceDetail: LeadsourceDetail[] = [];
  productDetail: ProductDetail[] = []
  statusDetail: SalesstatusDetail[] = [];
  userControl = new FormControl();
  products;
  product_name;
  product_keyword = 'product_name';
  customer_keyword = "first_name";
  customers;
  selectedProducts = new Array<any>();
  filteredProducts: Observable<any>;
  lastFilter: string = '';
  total_cost = 0;
  quantity = 1;
  discount = 0;
  displayValue: string;
  first_name: string;
  filteredTableDataArr: any;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  file: any;
  notes: any[];
  title: string;
  rowsOnPage = 5;
  currentDate = new Date();
dateFormat = "dd MMM yyyy";
currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));


  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, 
    @Inject(LOCALE_ID) public locale: string,injector: Injector, public _uiservice: UiService) {

    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_DEALS, injector);
  }



  async htmlInit() {
    this._dbService.getAllCustomers().subscribe(res => {
      if (res)
        this.customers = res["data"];
    });
    let result = await this._dbService.getAllPipelines().toPromise();
    this.pipelineDetail = result["data"];
    {

      let result = await this._dbService.getAllLeadSources().toPromise();
      this.leadsourceDetail = result["data"];

    }
    {
      let result = await this._dbService.getAllSalesStages().toPromise();

      this.salesstageDetail = result["data"];

    }
    {
      let result = await this._dbService.getAllsalesStatus().toPromise();

      this.statusDetail = result["data"];

    }
    {
      let result = await this._dbService.getAllUsers().toPromise();

      this.userDetail = result["data"];

    }




  }

  catch(error) {
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
     this.CAN_ADD = false; */



  }



  async ngOnInit() {
    await this.htmlInit();
    await this.init();
    await this.populateFields();
    this.dealDetail = new DealDetail();
    {
      let productResult = await this._dbService.getAllProductsList().toPromise();
      this.products = productResult["data"];
      //add properties to the product object, needs to be created a model for mapping
      this.products.forEach(element => {
        element.selected = false;
        element.quantity = 1;
        element.discount = 0;
      })
    };
    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let deal_id = params["id"];
        if (deal_id) {
          let result = await this._dbService.getDeals(deal_id).toPromise();
          //console.log(result);
          this.dealDetail = result["data"];
          this.isUpdate = true;
          this.flagShowDefaultIcon = false;

          this.dealDetail.product_name.forEach(element => {
            this.products.forEach(el => {
              if (el.product_name == element.product_name) {

                el.product_id = element.product_id;
                el.quantity = element.quantity;
                el.discount = element.discount;
                el.product_Total = element.product_Total;
                this.toggleSelection(el);
              }
            });
          });
        }

      });

    

    //on search in product name, filter the result
    this.filteredProducts = this.userControl.valueChanges.pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  stockCheck = async (products) => {
    let data = {
      data:{
        status:true
      }
    }
    if (this.dealDetail.status != "Closed") {
      for (let [i, k] of products.entries()) {
        let stock: any = await this._dbService.checkStock(k.product_id, k.quantity, "dealsCreated").toPromise();
        if (i + 1 == products.length)
          return stock
  
      }
    }
    else{
      for (let [i, k] of products.entries()) {
        let stock: any = await this._dbService.checkStock(k.product_id, k.quantity, "deals").toPromise();
        if (i + 1 == products.length)
          return stock
  
      }
    }
    
  }


  async onSubmit() {
    
      this.stockCheck(this.dealDetail.product_name).then(async (x: any) => {
        if (x.data.status) {
          // console.log(this.dealDetail, " this.dealDetail")
          this.dealDetail.object_type = GlobalConstants.OBJECT_DETAIL_CUSTOMER;
          // CustomLogger.logStringWithObject("Will save Deals...", this.dealDetail);
          this.dealDetail.updated_by = this._dbService.getCurrentUserDetail().email;
          /*   this.dealDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
          this.dealDetail.modified_time = Date.now();
          this.dealDetail.product_id;
          try {
            let result = null;
            if (this.isUpdate) {
              result = await this._dbService.updateDeal(this.dealDetail).toPromise();
            }
            else {
  
              this.dealDetail.created_by = this._dbService.getCurrentUserDetail().email;
              /*   this.dealDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
              this.dealDetail.created_time = Date.now();
  
  
              let newDealDetail = new DealDetail();
  
              newDealDetail.deal_name = this.dealDetail.deal_name;
              newDealDetail.object_id = this.dealDetail.object_id;
              newDealDetail.deal_id = this.dealDetail.deal_id;
              newDealDetail.product_id = this.dealDetail.product_id;
              newDealDetail.status = this.dealDetail.status;
              newDealDetail.expected_close_date = this.dealDetail.expected_close_date;
              newDealDetail.pipeline_name = this.dealDetail.pipeline_name;
              newDealDetail.salesstage_name = this.dealDetail.salesstage_name;
              newDealDetail.assigned_to = this.dealDetail.assigned_to;
              newDealDetail.lead_source_name = this.dealDetail.lead_source_name;
              newDealDetail.total_cost = this.dealDetail.total_cost;
              newDealDetail.amount = this.dealDetail.amount;
              newDealDetail.product_name = this.dealDetail.product_name;
              newDealDetail.deal_close_date = this.dealDetail.deal_close_date;
              newDealDetail.type = this.dealDetail.type;
              newDealDetail.object_type = this.dealDetail.object_type;
              newDealDetail.first_name = this.dealDetail.first_name;
              newDealDetail.probobility = this.dealDetail.probobility;
              newDealDetail.activity_type = this.dealDetail.activity_type;
              newDealDetail.modified_time = this.dealDetail.modified_time;
              newDealDetail.created_time = this.dealDetail.created_time;
              newDealDetail.created_by = this.dealDetail.created_by;
              newDealDetail.updated_by = this.dealDetail.updated_by;
  
              result = await this._dbService.addDeal(newDealDetail).toPromise();
            }
            //CustomLogger.logStringWithObject("added Deals:result:", result);
            if (!this.isUpdate)
              CustomMisc.showAlert("Deal Added Successfully");
            else
              CustomMisc.showAlert("Deal Updated Successfully");
            this._router.navigate(["/sales/deallist"]);
  
  
          }
  
          catch (error) {
            CustomLogger.logError(error);
            CustomMisc.showAlert("Error in adding Deals: " + error.message, true);
          }
        }
        else {
          if (x.data.productCount == "0")
            CustomMisc.showAlert("Product " + x.data.productName + " is out of stock." + " Please check with supplier");
          else
            CustomMisc.showAlert("Product " + x.data.productName + " is available only " + x.data.productCount + " quantity. Please check with supplier");
          // console.log("nuu", x)
        }
      })
  
    
   
    
  }


  // set the mobile and customer name on select of customer
  onCustomerSelect(customer) {
    /*  this.quoteDetail.phone = customer.phone; */
    this.dealDetail = customer;
    this.first_name = customer.fist_name;
    this.dealDetail.object_id = customer.object_id;
    this.dealDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;

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
    product.selected = !product.selected;
    if (product.selected) {
      if (!this.isUpdate) {

        product.product_Total = product.cost;

      }
      this.selectedProducts.push(product);
    } else {
      const i = this.selectedProducts.findIndex(value => (value.product_name === product.product_name));
      this.selectedProducts.splice(i, 1);
    }

    this.userControl.setValue(this.selectedProducts);
    this.total_cost = this.gettotal_cost();
    this.dealDetail.amount = this.gettotal_cost();
  }

  //on change of product quantity, update corresponding values
  onChangeProductQnt(index, ev) {
    this.selectedProducts[index].quantity = ev.target.value;
    this.selectedProducts[index].product_Total = (this.selectedProducts[index].cost * ev.target.value) - (this.selectedProducts[index].cost * ev.target.value * this.selectedProducts[index].discount / 100);
    this.total_cost = this.gettotal_cost();
    this.dealDetail.amount = this.gettotal_cost();
  }

  //on change of product discount, update corresponding values
  onChangeProductDiscount(index, ev) {
    this.selectedProducts[index].discount = ev.target.value;
    let total = this.selectedProducts[index].cost * this.selectedProducts[index].quantity;
    this.selectedProducts[index].product_Total = total - total * ev.target.value / 100;
    this.total_cost = this.gettotal_cost();
    this.dealDetail.amount = this.gettotal_cost();
  }

  //get the total cost based on quantity and discounts of all added products
  gettotal_cost() {
    //console.log("Total cost...");
    // console.log(this.selectedProducts);
    return this.selectedProducts.reduce((a, b) => a + (b['product_Total'] || 0), 0);
  }


  upload(event: Event) {
    this.file = event.target as HTMLInputElement;
  }

  key: string = 'id'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
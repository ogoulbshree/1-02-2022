import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends DynamicComponent implements OnInit {



  totalproducts = 0;
  totalcustomers = 0;
  totalsupplier = 0;
  totalpurchase = 0;
  totalinvoices = 0;
  totalreturns = 0
  model: any = {
    fromDate: "",
    toDate: ""
  };
  filter: any = {
    from: 0,
    to: 0,
  };
  date = new Date;
  filterFlagEnabled: boolean = false;
  filteredProducts: [];
  totalProductsCount: number = 0;
  filteredCustomers: [];
  totalCustomersCount: number = 0;
  filteredSuppliers: [];
  totalSupplierCount: number = 0;
  filteredPurchases: [];
  totalPurchaseCount: number = 0;
  filteredReturns: [];
  totalReturnCount: number = 0;
  filteredInvoice: [];
  totalInvoiceCount: number = 0;
  customerPagination: number = 1;
  productsPagiantion: number = 1;
  supplierPagination: number = 1;
  purchasePagination: number = 1;
  returnPagination: number = 1;
  invoicePagination: number = 1;
  key: string = 'id'
  reverse :boolean =true;
  constructor(public  _uiservice: UiService,private toast: ToastrService, injector: Injector,private _router: Router) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_DASHBOARD, injector);
  }


  async ngOnInit() {

    await this.populateFields();
    let result = await this._dbService.dashboardSearch().toPromise();
    // console.log("DASH RESH....:", result["data"]);
    let dashObj = result["data"];
    this.totalproducts = dashObj.totalproducts;
    this.totalcustomers = dashObj.totalcustomers;
    this.totalsupplier = dashObj.totalsupplier;
    this.totalpurchase = dashObj.totalpurchase;
    this.totalinvoices = dashObj.totalinvoices;
    this.totalreturns = dashObj.totalreturns;






    setTimeout(() => { }, 1);
  }


  pageChanged(data, event) {

    if (data == "customers")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredCustomers = res.data.totalCustomers
      })
    else if (data == "products")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredProducts = res.data.totalProducts
      })
    else if (data == "suppliers")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredSuppliers = res.data.totalSuppliers
      })
    else if (data == "purchase")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredPurchases = res.data.totalSuppliers
      })
    else if (data == "return")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredReturns = res.data.totalReturns
      })
    else if (data == "invoice")
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredInvoice = res.data.totalInvoices
      })

  }
  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names += productArr[k].product_name;
      if (k < (productArr.length - 1)) names += ",";
    }
    return names + "]";
  }
  filterData = async () => {
    this.filter = {
      from: new Date(this.model.fromDate).getTime(),
      to: new Date(this.model.toDate).getTime() + 86400000,
    };
    
    let page = 1;
    if (this.model.fromDate == '' || this.model.toDate == '') 
    {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    } 
  
    if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
    else{
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from, this.filter.to, page)
      .subscribe((response: any) => {
        if (response && response.data) {
          this.filteredCustomers = response.data.totalCustomers;
          this.totalCustomersCount = response.data.totalCustomersCount;
          this.filteredProducts = response.data.totalProducts;
          this.totalProductsCount = response.data.totalProductsCount;
          this.filteredSuppliers = response.data.totalSuppliers;
          this.totalSupplierCount = response.data.totalSuppliersCount;
          this.filteredPurchases = response.data.totalPurchases;
          this.totalPurchaseCount = response.data.totalPurchasesCount;
          this.filteredReturns = response.data.totalReturns;
          this.totalReturnCount = response.data.totalReturnsCount;
          this.filteredInvoice = response.data.totalInvoices;
          this.totalInvoiceCount = response.data.totalInvoiceCount;
          this.filterFlagEnabled = true;
        }
      });
    }
  }
  onClickEdit(data, obj) {
   
     if (data == "customers")
      this._router.navigate(['/inventory/customers', obj.object_id]);
    else if (data == "products")
      this._router.navigate(['inventory/products', obj.product_id]);
    else if (data == "suppliers")
    this._router.navigate(['inventory/suppliers',obj.supplier_id]);

    else if (data == "purchases")
    this._router.navigate(['inventory/purchases',obj.purchase_id]);

    else if (data == "return")
    this._router.navigate(['inventory/return',obj.return_id]);
    else if (data == "invoice")
    this._router.navigate(['inventory/invoice',obj.invoice_id]);
  }
  async onClickDelete(data, obj) {
    
   if (data == "customers") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "products") {
      if (confirm("Are you sure to delete " + obj.product_name)) {
        await this._dbService.deleteProduct(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "suppliers") {
      if(confirm("Are you sure to delete "+obj.supplier_name)) {
        await this._dbService.deleteSuppliername(obj).toPromise();
       // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "purchases") {
      if(confirm("Are you sure to delete "+obj.supplier_name)) {
        await this._dbService.deletePurchases(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "return") {
      if(confirm("Are you sure to delete "+obj.supplier_name)) {
        await this._dbService.deleteReturns(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "invoice") {
      
      if(confirm("Are you sure to delete "+obj.first_name)) {
        await this._dbService.deleteInvoice(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
  }
  sortCustomers(id){

  }
  sort(id){
    
  }
}



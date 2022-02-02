import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { ToastrModule } from "ngx-toastr";

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { InventaryRoutingModule } from './inventory.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductslistComponent } from './productslist/productslist.component';

import { AdduserComponent } from './settings/usermanagment/adduser/adduser.component';
import { UserlistComponent } from './settings/usermanagment/userlist/userlist.component';
import { SettingComponent } from './settings/setting/setting.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenselistComponent } from './expenselist/expenselist.component';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';
import { HistoryComponent } from './settings/history/history.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { CategoryaddComponent } from './settings/dynamicsettings/categoryadd/categoryadd.component';
import { CategorylistComponent } from './settings/dynamicsettings/categorylist/categorylist.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { CurrencylistComponent } from './settings/dynamicsettings/currencylist/currencylist.component';
import { AddcurrencyComponent } from './settings/dynamicsettings/addcurrency/addcurrency.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseslistComponent } from './purchaseslist/purchaseslist.component';
import { AddexpensesitemComponent } from './settings/dynamicsettings/addexpensesitem/addexpensesitem.component';
import { ExpensesitemlistComponent } from './settings/dynamicsettings/expensesitemlist/expensesitemlist.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { StockComponent } from './stock/stock.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { WarehouseComponent } from './settings/dynamicsettings/warehouse/warehouse.component';
import { WarehouselistComponent } from './settings/dynamicsettings/warehouselist/warehouselist.component';

import { ReturnlistComponent } from './returnlist/returnlist.component';
import { ReturnComponent } from './return/return.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';


import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,

} from '@angular/material';
import { ReturnproductlistComponent } from './settings/dynamicsettings/returnproductlist/returnproductlist.component';
import { ReturnproductsComponent } from './settings/dynamicsettings/returnproducts/returnproducts.component';







@NgModule({
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    
  ],
  
  
 
 
 
  
  
  
})

export class DemoMaterialModule {}

@NgModule({
  imports: [
  
    SharedModule,
    InventaryRoutingModule,
    DataTableModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    Ng2OrderModule,
    
    NgxPaginationModule,
    AutocompleteLibModule,
    DemoMaterialModule,
   
  ],
  declarations: [
    
  DashboardComponent,
    
  ProductsComponent,
    
  ProductslistComponent,

  ReturnproductlistComponent,
  ReturnproductsComponent,
  AdduserComponent,
    
  UserlistComponent,
    
  SettingComponent,
    
  CustomersComponent,
  CategorylistComponent ,
  CustomerslistComponent,
    
  SuppliersComponent,
    
  SupplierslistComponent,
    
  HistoryComponent,
    
  EditformfieldsComponent,
    
  DynamicsettingsComponent,
    
  DepartmentComponent,
    
  DepartmentlistComponent,
    
  SourcelistComponent,
    
  SourceComponent,
    
  CategoryaddComponent,
    
  CategorylistComponent,
    
  ChangepasswordComponent,
    
  CurrencylistComponent,
    
  AddcurrencyComponent,
    
  PurchasesComponent,
  InvoiceComponent, 
  InvoicelistComponent,
  AddexpenseComponent, 
  ExpenselistComponent,
  AddexpensesitemComponent,
   ExpensesitemlistComponent,
   WarehouseComponent, 
   WarehouselistComponent,
   ReturnlistComponent, 
   ReturnComponent,
   StockComponent,
    StocklistComponent,
    EditprofileComponent,
  
  PurchaseslistComponent,ReportlistComponent,],
  
  providers:[DatePipe]
})
export class InventaryModule { }

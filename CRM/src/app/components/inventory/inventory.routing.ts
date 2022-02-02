import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './settings/usermanagment/adduser/adduser.component';
import { UserlistComponent } from './settings/usermanagment/userlist/userlist.component';
import { SettingComponent } from './settings/setting/setting.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { HistoryComponent } from './settings/history/history.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings.component';
import { CategorylistComponent } from './settings/dynamicsettings/categorylist/categorylist.component';
import { CategoryaddComponent } from './settings/dynamicsettings/categoryadd/categoryadd.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { AddcurrencyComponent } from './settings/dynamicsettings/addcurrency/addcurrency.component';
import { CurrencylistComponent } from './settings/dynamicsettings/currencylist/currencylist.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseslistComponent } from './purchaseslist/purchaseslist.component';
import { ExpenselistComponent } from './expenselist/expenselist.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpensesitemlistComponent } from './settings/dynamicsettings/expensesitemlist/expensesitemlist.component';
import { AddexpensesitemComponent } from './settings/dynamicsettings/addexpensesitem/addexpensesitem.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StockComponent } from './stock/stock.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { WarehouseComponent } from './settings/dynamicsettings/warehouse/warehouse.component';
import { WarehouselistComponent } from './settings/dynamicsettings/warehouselist/warehouselist.component';
import { ReturnComponent } from './return/return.component';
import { ReturnlistComponent } from './returnlist/returnlist.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';



const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'inventory',
      status: false
    },
    children: [
     
  {path: 'dashboard' , 
  component: DashboardComponent
},


{
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductsComponent
  },
  {
    path: 'productslist',
    component: ProductslistComponent
  },

  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path: 'suppliers/:id',
    component: SuppliersComponent
  },
  {
    path: 'supplierslist',
    component: SupplierslistComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id',
    component: CustomersComponent
  },
  {
    path: 'customerslist',
    component: CustomerslistComponent
  },
  {
    path: 'settings/history',
    component: HistoryComponent
  },
  {
    path: 'settings/adduser',
    component: AdduserComponent
  },
  {
    path: 'settings/adduser/:id',
    component: AdduserComponent
  },
  {
    path: 'settings/userlist',
    component: UserlistComponent
  },
 
  {
    path: 'settings/setting',
    component: SettingComponent
  },
  {
    path: 'settings/editprofile',
    component: EditprofileComponent
  },
  {
    path: 'settings/editformfields',
    component: EditformfieldsComponent
  },
  {
    path: 'settings/dynamicsettings',
    component: DynamicsettingsComponent
  },
  {
    path: 'settings/dynamicsettings/department/:id',
    component: DepartmentComponent
  },
  {
    path: 'settings/dynamicsettings/department',
    component: DepartmentComponent
  },
  {
    path: 'settings/dynamicsettings/departmentlist',
    component: DepartmentlistComponent
  },
  {
    path: 'settings/dynamicsettings/source/:id',
    component: SourceComponent
  },
  {
    path: 'settings/dynamicsettings/source',
    component: SourceComponent
  },
  {
    path: 'settings/dynamicsettings/sourcelist',
    component: SourcelistComponent
  },
  
  {
    path: 'settings/dynamicsettings/addcurrency/:id',
    component: AddcurrencyComponent
  },
  {
    path: 'settings/dynamicsettings/addcurrency',
    component: AddcurrencyComponent
  },
  {
    path: 'settings/dynamicsettings/currencylist',
    component: CurrencylistComponent
  },


  {
    path: 'settings/changepassword',
    component:ChangepasswordComponent
  },
  {
    path: 'settings/dynamicsettings/categoryadd/:id',
    component: CategoryaddComponent
  },
  {
    path: 'settings/dynamicsettings/categoryadd',
    component: CategoryaddComponent
  },
  {
    path: 'settings/dynamicsettings/categorylist',
    component: CategorylistComponent
  },
  {
    path: 'purchases/:id',
    component: PurchasesComponent
  },
  {
    path: 'purchases',
    component: PurchasesComponent
  },
  {
    path: 'purchaseslist',
    component: PurchaseslistComponent
  },


  {
    path: 'addexpense/:id',
    component: AddexpenseComponent
  },
  {
    path: 'addexpense',
    component: AddexpenseComponent
  },
  {
    path: 'expenselist',
    component: ExpenselistComponent
  },

  {
    path: 'settings/dynamicsettings/addexpensesitem/:id',
    component: AddexpensesitemComponent
  },
  {
    path: 'settings/dynamicsettings/addexpensesitem',
    component: AddexpensesitemComponent
  },
  {
    path: 'settings/dynamicsettings/expensesitemlist',
    component: ExpensesitemlistComponent
  },


  {
    path: 'invoice/:id',
    component: InvoiceComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'invoicelist',
    component: InvoicelistComponent
  },





  {
    path: 'return/:id',
    component: ReturnComponent
  },
  {
    path: 'return',
    component: ReturnComponent
  },
  {
    path: 'returnlist',
    component: ReturnlistComponent
  },


  {
    path: 'stock/:id',
    component: StockComponent
  },
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: 'stocklist',
    component: StocklistComponent
  },

  {
    path: 'settings/dynamicsettings/warehouse/:id',
    component: WarehouseComponent
  },
  {
    path: 'settings/dynamicsettings/warehouse',
    component: WarehouseComponent
  },
  {
    path: 'settings/dynamicsettings/warehouselist',
    component: WarehouselistComponent
  },
  {
    path: 'reports',
    component: ReportlistComponent
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InventaryRoutingModule { }
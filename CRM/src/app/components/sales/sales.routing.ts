import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesDashboardComponent } from './dashboard/sales-dashboard.component';
import { SalesdealsComponent } from './salesdeals/salesdeals.component';


import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { HistoryComponent } from './settings/history/history.component';
import { SettingComponent } from './settings/setting/setting.component';
import { CreateproductsComponent } from './products/createproducts/createproducts.component';
import { ProductslistComponent } from './products/productslist/productslist.component';
import { CategorylistComponent } from './products/categorylist/categorylist.component';
import { CategoryaddComponent } from './products/categoryadd/categoryadd.component';
import { UserlistComponent } from './settings/usermanagement/userlist/userlist.component';
import { AdduserComponent } from './settings/usermanagement/adduser/adduser.component';
import { CreatequotationComponent } from './createquotation/createquotation.component';
import { QuotationlistComponent } from './quotationlist/quotationlist.component';
import { DeallistComponent } from './deallist/deallist.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { PipelinesettingsComponent } from './settings/dynamicsettings/pipelinesettings/pipelinesettings.component';
import { PipelinesettinglistComponent } from './settings/dynamicsettings/pipelinesettinglist/pipelinesettinglist.component';
import { SalesstageComponent } from './settings/dynamicsettings/salesstage/salesstage.component';
import { SalesstagelistComponent } from './settings/dynamicsettings/salesstagelist/salesstagelist.component';
import { LeadsourceComponent } from './settings/dynamicsettings/leadsource/leadsource.component';
import { LeadsourcelistComponent } from './settings/dynamicsettings/leadsourcelist/leadsourcelist.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { AddvisitsComponent } from './addvisits/addvisits.component';
import { AddvisitslistComponent } from './addvisitslist/addvisitslist.component';
import { ShedulevisitsComponent } from './shedulevisits/shedulevisits.component';
import { ShedulevisitslistComponent } from './shedulevisitslist/shedulevisitslist.component';
import { AddexpenseComponent } from './settings/dynamicsettings/addexpense/addexpense.component';
import { ExpenselistComponent } from './settings/dynamicsettings/expenselist/expenselist.component';
import { AddexpensesitemComponent } from './settings/dynamicsettings/addexpensesitem/addexpensesitem.component';
import { ExpensesitemlistComponent } from './settings/dynamicsettings/expensesitemlist/expensesitemlist.component';
import { LeadslistComponent } from './leadslist/leadslist.component';
import { LeadsComponent } from './leads/leads.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatuslistComponent } from './settings/dynamicsettings/statuslist/statuslist.component';
import { StatusComponent } from './settings/dynamicsettings/status/status.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { SuppliernameComponent } from './settings/dynamicsettings/suppliername/suppliername.component';
import { SuppliernamelistComponent } from './settings/dynamicsettings/suppliernamelist/suppliernamelist.component';
import { CurrencylistComponent } from './settings/dynamicsettings/currencylist/currencylist.component';
import { AddcurrencyComponent } from './settings/dynamicsettings/addcurrency/addcurrency.component';
import { ConfigureOrganisationComponent } from './settings/configureorganisation/configureorganisation.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'sales',
      status: false
    },
    children: [
      {
        path: 'dashboard' , 
        component: SalesDashboardComponent 
      },
      {
        path: 'createquotation',
        component: CreatequotationComponent
      },
      {
        path: 'createquotation/:id',
        component: CreatequotationComponent
      },
      {
        path: 'quotationlist',
        component: QuotationlistComponent
      },
      {
        path: 'products/createproducts',
        component: CreateproductsComponent
      },
      {
        path: 'products/createproducts/:id',
        component: CreateproductsComponent
      },
      {
        path: 'products/productslist',
        component: ProductslistComponent
      },

       {
        path: 'salesdeals',
        component: SalesdealsComponent
      },
      {
        path: 'salesdeals/:id',
        component: SalesdealsComponent
      },
      {
        path: 'deallist',
        component: DeallistComponent
      },
    
      {
        path: 'products/categoryadd',
        component: CategoryaddComponent
      },
      {
        path: 'products/categoryadd/:id',
        component: CategoryaddComponent
      },
      {
        path: 'categorylist',
        component: CategorylistComponent
      },
      
      {
        path: 'addcustomer/:id',
        component: AddcustomerComponent
      },
      {
        path: 'addcustomer',
        component: AddcustomerComponent
      },
      {
        path: 'customerlist',
        component: CustomerlistComponent
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
        path: 'products/categoryadd/:id',
        component: CategoryaddComponent
      },
      {
        path: 'products/categoryadd',
        component: CategoryaddComponent
      },
      {
        path: 'products/categorylist',
        component: CategorylistComponent
      },
      {
        path: 'settings/dynamicsettings',
        component: DynamicsettingsComponent
      },
      {
        path: 'settings/dynamicsettings/pipelinesettings/:id',
        component: PipelinesettingsComponent
      },
      {
        path: 'settings/dynamicsettings/pipelinesettings',
        component: PipelinesettingsComponent
      },
      {
        path: 'settings/dynamicsettings/pipelinesettinglist',
        component: PipelinesettinglistComponent
      },

      {
        path: 'settings/dynamicsettings/salesstage/:id',
        component: SalesstageComponent
      },
      {
        path: 'settings/dynamicsettings/salesstage',
        component: SalesstageComponent
      },
      {
        path: 'settings/dynamicsettings/salesstagelist',
        component: SalesstagelistComponent
      },

      {
        path: 'settings/dynamicsettings/leadsource/:id',
        component: LeadsourceComponent
      },
      {
        path: 'settings/dynamicsettings/leadsource',
        component: LeadsourceComponent
      },
      {
        path: 'settings/dynamicsettings/leadsourcelist',
        component: LeadsourcelistComponent
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
        path: 'addvisits/:id',
        component: AddvisitsComponent
      },
      {
        path: 'addvisits',
        component: AddvisitsComponent
      },
      {
        path: 'addvisitslist',
        component: AddvisitslistComponent
      },

      {
        path: 'settings/dynamicsettings/addexpense',
        component: AddexpenseComponent
      },
      {
        path: 'settings/dynamicsettings/addexpense/:id',
        component: AddexpenseComponent
      },
      {
        path: 'settings/dynamicsettings/expenselist',
        component: ExpenselistComponent
      },



      {
        path: 'settings/dynamicsettings/addexpensesitem',
        component: AddexpensesitemComponent
      },
      {
        path: 'settings/dynamicsettings/addexpensesitem/:id',
        component: AddexpensesitemComponent
      },
      {
        path: 'settings/dynamicsettings/expensesitemlist',
        component: ExpensesitemlistComponent
      },
      {
        path: 'settings/dynamicsettings/suppliername',
        component: SuppliernameComponent
      },
      {
        path: 'settings/dynamicsettings/suppliername/:id',
        component: SuppliernameComponent
      },
      {
        path: 'settings/dynamicsettings/suppliernamelist',
        component: SuppliernamelistComponent
      },

      {
        path: 'shedulevisits/:id',
        component: ShedulevisitsComponent
      },
      {
        path: 'shedulevisits',
        component: ShedulevisitsComponent
      },
      {
        path: 'shedulevisitslist',
        component: ShedulevisitslistComponent
      },
      {
        path: 'leads/:id',
        component: LeadsComponent
      },
      {
        path: 'leads',
        component: LeadsComponent
      },
      {
        path: 'leadslist',
        component: LeadslistComponent
      },
      {
        path: 'settings/editformfields',
        component: EditformfieldsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'settings/dynamicsettings/statuslist',
        component: StatuslistComponent
      },

      {
        path: 'settings/dynamicsettings/status:id',
        component: StatusComponent
      },
      
    
      {
        path: 'settings/dynamicsettings/status',
        component:StatusComponent
      },
     

      {
        path: 'settings/changepassword',
        component:ChangepasswordComponent
      },
      { path: 'settings/configureorganisation',
      component:ConfigureOrganisationComponent
      
      },
      {
        path: 'settings/editprofile',
        component:EditprofileComponent
      },



      {
        path: 'settings/dynamicsettings/currencylist',
        component: CurrencylistComponent
      },

      {
        path: 'settings/dynamicsettings/addcurrency/:id',
        component:AddcurrencyComponent
      },
      
    
      {
        path: 'settings/dynamicsettings/addcurrency',
        component:AddcurrencyComponent
      },
      {
        path: 'reports',
        component:ReportlistComponent
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SalesRoutingModule { }
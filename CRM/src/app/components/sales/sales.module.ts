import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SalesRoutingModule} from './sales.routing'
import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
// import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { DataTableModule } from 'angular-6-datatable';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';

import { PipelinesettingsComponent } from './settings/dynamicsettings/pipelinesettings/pipelinesettings.component';
import { SalesstageComponent } from './settings/dynamicsettings/salesstage/salesstage.component';
import { LeadsourceComponent } from './settings/dynamicsettings/leadsource/leadsource.component';
import { PipelinesettinglistComponent } from './settings/dynamicsettings/pipelinesettinglist/pipelinesettinglist.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ToastyModule} from 'ng2-toasty';
import { SalesdealsComponent } from './salesdeals/salesdeals.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SalesDashboardComponent } from './dashboard/sales-dashboard.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { HistoryComponent } from './settings/history/history.component';
import { SettingComponent } from './settings/setting/setting.component';
import { CreateproductsComponent } from './products/createproducts/createproducts.component';
import { ProductslistComponent } from './products/productslist/productslist.component';
import { CategorylistComponent } from './products/categorylist/categorylist.component';
import { CategoryaddComponent } from './products/categoryadd/categoryadd.component';
import { UserlistComponent } from './settings/usermanagement/userlist/userlist.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete'; 
import { AdduserComponent } from './settings/usermanagement/adduser/adduser.component';
import { DatePipe } from '@angular/common';
import { CreatequotationComponent } from './createquotation/createquotation.component';
import { QuotationlistComponent } from './quotationlist/quotationlist.component';
import { DeallistComponent } from './deallist/deallist.component';
import { SalesstagelistComponent } from './settings/dynamicsettings/salesstagelist/salesstagelist.component';
import { LeadsourcelistComponent } from './settings/dynamicsettings/leadsourcelist/leadsourcelist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import {AnimatorModule} from 'css-animator';
import {AgmCoreModule, AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
import { AddexpenseComponent } from './settings/dynamicsettings/addexpense/addexpense.component';
import { ExpenselistComponent } from './settings/dynamicsettings/expenselist/expenselist.component';
import { AddvisitsComponent } from './addvisits/addvisits.component';
import { AddvisitslistComponent } from './addvisitslist/addvisitslist.component';
import { ShedulevisitslistComponent } from './shedulevisitslist/shedulevisitslist.component';
import { ShedulevisitsComponent } from './shedulevisits/shedulevisits.component';
import { AddexpensesitemComponent } from './settings/dynamicsettings/addexpensesitem/addexpensesitem.component';
import { ExpensesitemlistComponent } from './settings/dynamicsettings/expensesitemlist/expensesitemlist.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { LeadslistComponent } from './leadslist/leadslist.component';
import { LeadsComponent } from './leads/leads.component';
/* import { FullCalendarModule } from '@fullcalendar/angular'; */
import { CalenderService } from 'src/app/services/calendar.service';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { StatusComponent } from './settings/dynamicsettings/status/status.component';
import { StatuslistComponent } from './settings/dynamicsettings/statuslist/statuslist.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { EventPopupComponent } from './event-popup/event-popup.component';
import { SuppliernameComponent } from './settings/dynamicsettings/suppliername/suppliername.component';
import { SuppliernamelistComponent } from './settings/dynamicsettings/suppliernamelist/suppliernamelist.component';
import { DateValidatorDirective } from './date-validator.directive';
import { AddcurrencyComponent } from './settings/dynamicsettings/addcurrency/addcurrency.component';
import { CurrencylistComponent } from './settings/dynamicsettings/currencylist/currencylist.component';



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
import { SalesproductsComponent } from './salesproducts/salesproducts.component';
import { SalesquoteComponent } from './salesquote/salesquote.component';
import { ProductcategoriesComponent } from './settings/dynamicsettings/productcategories/productcategories.component';
import { ConfigureOrganisationComponent } from './settings/configureorganisation/configureorganisation.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';
import { ExpenselistComponent1 } from './expenselist/expenselist.component';
import { AddexpenseComponent1 } from './addexpense/addexpense.component';









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
    ToastyModule.forRoot(),
    SharedModule,
    SalesRoutingModule,
    DataTableModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    HttpClientModule,
   AutocompleteLibModule,
    DemoMaterialModule,
    
    FormsModule,
    ReactiveFormsModule,
    // FullCalendarModule, // for FullCalendar!
    AnimatorModule,
    CommonModule ,
  
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  
    ToastrModule.forRoot(),
 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhFzy3EwbidUdK98BWrSs6lNECgT6h3MM'
    }),
   
  ],
  declarations: [
 
    SalesdealsComponent,
    AddexpenseComponent1,
    ExpenselistComponent1,
    SalesDashboardComponent,
    AddcustomerComponent,
    CustomerlistComponent,
    HistoryComponent,
    SettingComponent,
    CreateproductsComponent,
    ProductslistComponent,
    CategoryaddComponent,
    CategorylistComponent,
    UserlistComponent,
    AdduserComponent,
    CreatequotationComponent,
    QuotationlistComponent,
    DeallistComponent,
    DynamicsettingsComponent,
    SalesproductsComponent ,
    ProductcategoriesComponent ,
    SalesquoteComponent ,
    PipelinesettingsComponent, 
    SalesstageComponent, 
    LeadsourceComponent,
    PipelinesettinglistComponent,
    SalesstagelistComponent,
     LeadsourcelistComponent,
    DepartmentComponent, 
    SourceComponent, 
    SourcelistComponent, 
    DepartmentlistComponent,
    AddvisitsComponent, 
    AddvisitslistComponent, 
    ShedulevisitslistComponent, 
    AddexpenseComponent,
    ExpenselistComponent,
    ShedulevisitsComponent,
    AddexpensesitemComponent,
    LeadslistComponent,
    LeadsComponent,
    StatusComponent,
    EditprofileComponent, 
    ChangepasswordComponent,
    ConfigureOrganisationComponent,
    StatuslistComponent,
     ExpensesitemlistComponent,
     EditformfieldsComponent,
     CalendarComponent,
     EventPopupComponent,
     SuppliernameComponent,
      SuppliernamelistComponent,
     DateValidatorDirective,
    AddcurrencyComponent,
     CurrencylistComponent,
     ReportlistComponent],

  providers:[DatePipe, CalenderService]
})
export class SalesModule { }


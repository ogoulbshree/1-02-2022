import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ServiceRoutingModule} from './service.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { ToastrModule } from "ngx-toastr";
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
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ServicefaqComponent } from './servicefaq/servicefaq.component';
import { ServicedashboardComponent } from './dashboard/ServiceDashboard.component';
import { ServicecasesComponent } from './cases/ServiceCases.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CaselistComponent } from './caselist/caselist.component';
import { ServiceCustomersComponent } from './customers/ServiceCustomers.component';
import { ServicefaqlistComponent } from './servicefaqlist/servicefaqlist.component';
import { HistoryComponent } from './settings/history/history.component';
import { SettingComponent } from './settings/setting/setting.component';
import { UserlistComponent } from './settings/usermanagement/userlist/userlist.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AdduserComponent } from './settings/usermanagement/adduser/adduser.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TicketingpageComponent } from './ticketingpage/ticketingpage.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';
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
    ServiceRoutingModule,
    DataTableModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    DemoMaterialModule,
    Ng2OrderModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
   
  ],
  declarations: [
    ServicefaqComponent,
    ServicedashboardComponent,
    ServicecasesComponent,
    CustomerlistComponent,
    CaselistComponent,
    ServiceCustomersComponent,
    ServicefaqlistComponent,
    HistoryComponent,
    SettingComponent,
    DynamicsettingsComponent,
    AdduserComponent,
    UserlistComponent,
    DepartmentComponent, 
    SourceComponent, 
    SourcelistComponent, 
    DepartmentlistComponent,
    EditformfieldsComponent,
    TicketdetailsComponent,
   
    TicketingpageComponent,
   
    EditprofileComponent,
    ReportlistComponent,
    ChangepasswordComponent,
  ],
  providers:[DatePipe]
})
export class ServiceModule { }

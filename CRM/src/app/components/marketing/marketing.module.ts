import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { BrowserModule } from '@angular/platform-browser';
import { MarketingRoutingModule} from './marketing.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ActivitylistComponent } from './activitymanagement/activitylist/activitylist.component';
import { AddactivityComponent } from './activitymanagement/addactivity/addactivity.component';
import { MarketingdashboardComponent } from './marketingdashboard/marketingdashboard.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { CampaignsComponent} from './campaigns/campaigns.component';
import { CampaignlistComponent} from './campaignlist/campaignlist.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { LeadslistComponent } from './leadslist/leadslist.component';
import { LeadsComponent } from './leads/leads.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { SettingComponent } from './settings/setting/setting.component';
import { UserlistComponent } from './settings/usermanagement/userlist/userlist.component';
import { HistoryComponent } from './settings/history/history.component';
import { AdduserComponent } from './settings/usermanagement/adduser/adduser.component';
import { DatePipe } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { CampaigntypeComponent } from './settings/dynamicsettings/Campaign/campaigntype/campaigntype.component';
import { CampaigntypelistComponent } from './settings/dynamicsettings/Campaign/campaigntypelist/campaigntypelist.component';
import { CampaignstatusComponent } from './settings/dynamicsettings/Campaign/campaignstatus/campaignstatus.component';
import { CampaignstatuslistComponent } from './settings/dynamicsettings/Campaign/campaignstatuslist/campaignstatuslist.component';
import { ActiveComponent } from './settings/dynamicsettings/Campaign/active/active.component';
import { ActivelistComponent } from './settings/dynamicsettings/Campaign/activelist/activelist.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';
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
    
    DemoMaterialModule,
    SharedModule,
    MarketingRoutingModule,
    DataTableModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AutocompleteLibModule,
    NgbModule,
    NgxCsvParserModule,
    NgbModalModule,
    Ng2OrderModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule
    
  ],
  declarations: [
    ActivitylistComponent,
    AddactivityComponent,
    MarketingdashboardComponent,
    AddcustomerComponent,
    AddcontactComponent,
    CampaignsComponent,
    CampaignlistComponent,
    ContactlistComponent,
    LeadslistComponent,
    LeadsComponent,
    CustomerlistComponent,
    SettingComponent,
    UserlistComponent,
    AdduserComponent,
    HistoryComponent,
    EditformfieldsComponent,
    DynamicsettingsComponent,
    SourcelistComponent,
    DepartmentComponent,
    DepartmentlistComponent,
    SourceComponent,
    CampaigntypeComponent,
    CampaigntypelistComponent,
    CampaignstatusComponent,
    CampaignstatuslistComponent,
    ActiveComponent,
    ActivelistComponent,
    EditprofileComponent,
    ChangepasswordComponent,
    ReportlistComponent
    
  ],
  providers:[DatePipe]
})
export class MarketingModule { }

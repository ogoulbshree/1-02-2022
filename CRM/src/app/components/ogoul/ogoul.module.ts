import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OgoulRoutingModule} from './ogoul.routing'
import { DataTableModule } from 'angular-6-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Ng2OrderModule } from 'ng2-order-pipe';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from 'src/app/components/ogoul/dashboard/dashboard.component';
import { UsersComponent } from 'src/app/components/ogoul/users/users.component';
import { ContactedusersComponent } from 'src/app/components/ogoul/contactedusers/contactedusers.component';
import { RequesteddemoComponent } from 'src/app/components/ogoul/requesteddemo/requesteddemo.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { SettingComponent } from './settings/setting/setting.component';
import { TicketingpageComponent } from './ticketingpage/ticketingpage.component';
import { RequesteddemopageComponent } from './requesteddemopage/requesteddemopage.component';
import { ContacteduserspageComponent } from './contacteduserspage/contacteduserspage.component';
import { AdduserpageComponent } from './adduserpage/adduserpage.component';
import { StatusComponent } from './settings/dynamicsettings/status/status.component';
import { StatuslistComponent } from './settings/dynamicsettings/statuslist/statuslist.component';
import { DatePipe } from '@angular/common';
import { HistoryComponent } from './settings/history/history.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { SurveyslistComponent } from './surveyslist/surveyslist.component';
import { SurveysComponent } from './surveys/surveys.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { PlansComponent } from './settings/dynamicsettings/plans/plans.component';
import { PlanslistComponent } from './settings/dynamicsettings/planslist/planslist.component';


@NgModule({
  imports: [
  
    SharedModule,
    OgoulRoutingModule,
    DataTableModule,
    Ng2SearchPipeModule,
    HttpClientModule,
 
    FormsModule,
   
    CommonModule,
    Ng2OrderModule,
    NgxPaginationModule,
   
  ],
  declarations: [
    RequesteddemoComponent,
    UsersComponent,
    ContactedusersComponent,
    DashboardComponent,
    TicketdetailsComponent,
   
    TicketingpageComponent,
   
    RequesteddemopageComponent,
    HistoryComponent,
    ContacteduserspageComponent,
    SettingComponent,
    AdduserpageComponent,
   
    StatusComponent,
   
    StatuslistComponent,
   
    DynamicsettingsComponent,
   
    SurveyslistComponent,
    EditformfieldsComponent ,
    SurveysComponent,SourcelistComponent, PlansComponent, PlanslistComponent
  
   
  ],
  providers:[DatePipe]
})
export class OgoulModule { }


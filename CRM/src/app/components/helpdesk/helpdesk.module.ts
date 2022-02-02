import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HelpdeskRoutingModule} from './helpdesk.routing'
import { DataTableModule } from 'angular-6-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Ng2OrderModule } from 'ng2-order-pipe';
import {CommonModule, DatePipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TicketslistComponent } from './ticketslist/ticketslist.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { LeadslistComponent } from './leadslist/leadslist.component';
import { AddleadsComponent } from './addleads/addleads.component';
import { DashboardComponent } from './dashboard/dashboard.component';





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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';




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
    HelpdeskRoutingModule,
    DataTableModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    Ng2OrderModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    DemoMaterialModule,
   
  ],
  declarations: [
    AddcustomerComponent,
    CustomerlistComponent,
    LeadslistComponent,
    AddleadsComponent,
    DashboardComponent,
    TicketsComponent,
    TicketslistComponent
  
  ],
  providers:[DatePipe]
})
export class HelpdeskModule { }


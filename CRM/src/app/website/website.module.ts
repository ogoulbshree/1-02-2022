import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './website-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../loginauth/login/login.component';
import { ResourcesComponent } from './resources/resources.component';
import { SupportComponent } from './support/support.component';
import { FeaturesComponent } from './features/features.component';
import { RequestdemoComponent } from './popup/requestdemo/requestdemo.component';
import { SurveyComponent } from './popup/survey/survey.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesComponent } from './services/services.component';
import { SalesComponent } from './productslist/sales/sales.component';
import { ServiceComponent } from './productslist/service/service.component';
import { MarketingComponent } from './productslist/marketing/marketing.component';
import { FooterComponent } from './footer/footer.component';
import { EditformfieldsComponent } from './website-page/editformfields/editformfields.component';
import { OrganisationPopComponent } from './popup/organisation-pop/organisation-pop.component';
import { DashboardComponent } from './website-page/dashboard/dashboard.component';

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


} 
from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatDialogModule,
    NgbModule,
    MatAutocompleteModule,


    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
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
  ],
 
  declarations: [HomeComponent, ProductsComponent, AboutusComponent,
    NavbarComponent, PricingComponent, ContactusComponent, LoginComponent, ResourcesComponent,
    SupportComponent, FeaturesComponent, RequestdemoComponent, SurveyComponent, ServicesComponent, SalesComponent, ServiceComponent, MarketingComponent, FooterComponent, OrganisationPopComponent, EditformfieldsComponent, DashboardComponent, ],
    entryComponents: [OrganisationPopComponent],
 
})
export class WebsiteModule { }
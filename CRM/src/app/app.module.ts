import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DBService } from 'src/app/services/dbservice.service';
import{AttachmentService} from 'src/app/services/attachment.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { JwtModule } from "@auth0/angular-jwt";
import {FlashMessagesModule} from 'angular2-flash-messages';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
// Datepicker module
/* import { MenuItems } from './shared/menu-items/menu-items'; */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NavbarComponent } from './components/navigation/navbar.component';
import { UiService } from './services/ui.service';
/* import {DataTableModule} from "angular-6-datatable"; */

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchfilterPipe } from './components/searchfilter.pipe';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModalDialogComponent } from 'ng-bootstrap-modal/src/modal/modal-dialog/modal-dialog.component';
import { ModalService } from 'ng-bootstrap-modal/src/modal/services/modal.service';



import { AuthComponent} from '././components/auth/auth.component'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthGuard } from './gaurds/loginauth.gaurd';

import { ToastrModule } from "ngx-toastr";

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { from } from 'rxjs';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalenderService } from './services/calendar.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SourceComponent } from './components/ogoul/settings/dynamicsettings/source/source.component';
import { CategorylistComponent } from './components/sales/products/categorylist/categorylist.component';
import { MatDialogModule } from '@angular/material';
import { EmployeesComponent } from './components/hrms/employees/employees.component';
import { HolidaysComponent } from './components/hrms/holidays/holidays.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectsComponent } from './components/hrms/projects/projects.component';

// import { LeavesComponent } from './components/hrms/leaves/leaves.component';



@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    NavbarComponent,
   AuthComponent,
 
   
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
    NgxCsvParserModule,
    ReactiveFormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
   
    AutocompleteLibModule,
  /*   DataTableModule, */
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    MatDialogModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["http://localhost:4200"],
        blacklistedRoutes: ["http://localhost:4200/website/home"],
       /*  blacklistedRoutes: ["http://localhost:4200/loginauth/login"], */
      },
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
      }
  }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),  
    /* ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) */
  ],
  // entryComponents:[EmployeesComponent,HolidaysComponent,ProjectsComponent],
  providers: [UiService,DBService, AuthGuard,AttachmentService, CalenderService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
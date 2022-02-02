import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HrmsRoutingModule } from './hrms.routing';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { SettingComponent } from './settings/setting/setting.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DesignationComponent } from './settings/dynamicsettings/designation/designation.component';
import { DesignationlistComponent } from './settings/dynamicsettings/designationlist/designationlist.component';

import { NoticetabComponent } from './noticetab/noticetab.component';
import { NoticetablistComponent } from './noticetablist/noticetablist.component';

import { HolidaylistComponent } from './holidaylist/holidaylist.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeavelistComponent } from './leavelist/leavelist.component';
import { LeavesComponent } from './leaves/leaves.component';
import { ExpenselistComponent } from './settings/dynamicsettings/expenselist/expenselist.component';
import { AddexpenseComponent } from './settings/dynamicsettings/addexpense/addexpense.component';
import { AdduserComponent } from './settings/usermanagment/adduser/adduser.component';
import { UserlistComponent } from './settings/usermanagment/userlist/userlist.component';
import { HistoryComponent } from './settings/history/history.component';

import { TraininglistComponent } from './traininglist/traininglist.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { PolicyComponent } from './settings/policy/policy.component';
import { PolicylistComponent } from './settings/policylist/policylist.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
// import { ProjectsComponent } from './projects/projects.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { FileUploadModule } from 'ng2-file-upload';




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
import { TravellistComponent } from './settings/dynamicsettings/travellist/travellist.component';
import { TravelsComponent } from './settings/dynamicsettings/travels/travels.component';
import { CandidatelistComponent } from './settings/dynamicsettings/candidatelist/candidatelist.component';
import { CandidatesComponent } from './settings/dynamicsettings/candidates/candidates.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CandidatesinfoComponent } from './candidatesinfo/candidatesinfo.component';
import { LeaveapprovelistComponent } from './settings/leaveapprovelist/leaveapprovelist.component';
import { LeaveapprovesComponent } from './settings/leaveapproves/leaveapproves.component';
import { EmployeestatusComponent } from './settings/dynamicsettings/employeestatus/employeestatus.component';
import { EmployeestatuslistComponent } from './settings/dynamicsettings/employeestatuslist/employeestatuslist.component';

import { AttendancelistComponent } from './settings/attendancelist/attendancelist.component';
import { AttendancesComponent } from './settings/attendances/attendances.component';
import { ConfigureleavelistComponent } from './settings/dynamicsettings/configureleavelist/configureleavelist.component';
import { ConfigureleavesComponent } from './settings/dynamicsettings/configureleaves/configureleaves.component';
import { MatDialog } from '@angular/material';
import { OrganisationlistComponent } from './settings/organisationlist/organisationlist.component';
import { OrganisationsComponent } from './settings/organisations/organisations.component';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { PayrolllistComponent } from './settings/payrolllist/payrolllist.component';
import { PayrollsComponent } from './settings/payrolls/payrolls.component';
import { ReportlistComponent } from './reportlist/reportlist.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventPopupComponent } from './event-popup/event-popup.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalenderPopupComponent } from './calender-popup/calender-popup.component';
import { TasklistComponent } from './settings/tasklist/tasklist.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { OrganisationinfolistComponent } from './settings/dynamicsettings/organisationinfolist/organisationinfolist.component';
import { OrganisationinfoComponent } from './settings/dynamicsettings/organisationinfo/organisationinfo.component';
import { PaysliplistComponent } from './settings/paysliplist/paysliplist.component';
import { PayslipsComponent } from './settings/payslips/payslips.component';
import { ProjectsComponent } from './projects/projects.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
])
@NgModule({
    imports: [
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
        SharedModule,
        HrmsRoutingModule,
        HttpClientModule,
        Ng2OrderModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        DragDropModule,
        NgSelectModule,
        MatCardModule,
        MatDialogModule,
        NgxOrgChartModule,
        FullCalendarModule,
    ],

    declarations: [EmployeesComponent,HolidaysComponent,ProjectsComponent,PayslipsComponent, PaysliplistComponent, OrganisationinfolistComponent, OrganisationinfoComponent, TasklistComponent, TasksComponent, DashboardComponent, EmployeelistComponent, ExpenselistComponent, AddexpenseComponent,
        SettingComponent, DynamicsettingsComponent, DepartmentComponent, DepartmentlistComponent, DesignationComponent, DesignationlistComponent, HolidaylistComponent,
        LeavelistComponent, LeavesComponent, EditformfieldsComponent,
        NoticetabComponent, NoticetablistComponent, AdduserComponent, UserlistComponent, HistoryComponent, TraininglistComponent, TrainingsComponent, TravellistComponent, TravelsComponent, CandidatelistComponent, CandidatesComponent, InterviewsComponent, CandidatesinfoComponent, LeaveapprovelistComponent, LeaveapprovesComponent,
        NoticetabComponent, NoticetablistComponent, AdduserComponent, UserlistComponent, HistoryComponent, TraininglistComponent, TrainingsComponent, TravellistComponent, TravelsComponent, CandidatelistComponent, CandidatesComponent, InterviewsComponent,
        CandidatesinfoComponent, EditprofileComponent, ChangepasswordComponent, EmployeestatusComponent, EmployeestatuslistComponent, ProjectlistComponent, AttendancelistComponent, AttendancesComponent, ConfigureleavelistComponent, ConfigureleavesComponent, PolicyComponent, PolicylistComponent, OrganisationlistComponent, OrganisationsComponent, PayrolllistComponent, PayrollsComponent, ReportlistComponent, CalendarComponent, EventPopupComponent, CalenderPopupComponent,
    ],
    entryComponents: [CalenderPopupComponent, LeavesComponent, TrainingsComponent, CandidatesinfoComponent,EmployeesComponent,HolidaysComponent,ProjectsComponent],


    providers: [DatePipe]
})
export class HrmsModule { }

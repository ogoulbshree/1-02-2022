import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { SettingComponent } from './settings/setting/setting.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { DesignationComponent } from './settings/dynamicsettings/designation/designation.component';
import { DesignationlistComponent } from './settings/dynamicsettings/designationlist/designationlist.component';
import { HolidaylistComponent } from './holidaylist/holidaylist.component';
import { LeavelistComponent } from './leavelist/leavelist.component';
import { NoticetabComponent } from './noticetab/noticetab.component';
import { NoticetablistComponent } from './noticetablist/noticetablist.component';
import { ExpenselistComponent } from './settings/dynamicsettings/expenselist/expenselist.component';
import { AddexpenseComponent } from './settings/dynamicsettings/addexpense/addexpense.component';
import { AdduserComponent } from './settings/usermanagment/adduser/adduser.component';
import { UserlistComponent } from './settings/usermanagment/userlist/userlist.component';
import { HistoryComponent } from './settings/history/history.component';
import { TraininglistComponent } from './traininglist/traininglist.component';
import { TravellistComponent } from './settings/dynamicsettings/travellist/travellist.component';
import { TravelsComponent } from './settings/dynamicsettings/travels/travels.component';
import { CandidatelistComponent } from './settings/dynamicsettings/candidatelist/candidatelist.component';
import { CandidatesComponent } from './settings/dynamicsettings/candidates/candidates.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { LeaveapprovelistComponent } from './settings/leaveapprovelist/leaveapprovelist.component';
import { LeaveapprovesComponent } from './settings/leaveapproves/leaveapproves.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { EmployeestatusComponent } from './settings/dynamicsettings/employeestatus/employeestatus.component';
import { EmployeestatuslistComponent } from './settings/dynamicsettings/employeestatuslist/employeestatuslist.component';
import { PolicylistComponent } from './settings/policylist/policylist.component';
import { PolicyComponent } from './settings/policy/policy.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { AttendancelistComponent } from './settings/attendancelist/attendancelist.component';
import { AttendancesComponent } from './settings/attendances/attendances.component';
import { ConfigureleavesComponent } from './settings/dynamicsettings/configureleaves/configureleaves.component';
import { ConfigureleavelistComponent } from './settings/dynamicsettings/configureleavelist/configureleavelist.component';
import { ProjectsComponent } from './projects/projects.component';
import { OrganisationlistComponent } from './settings/organisationlist/organisationlist.component';
import { OrganisationsComponent } from './settings/organisations/organisations.component';
import { PayrolllistComponent } from './settings/payrolllist/payrolllist.component';
import { PayrollsComponent } from './settings/payrolls/payrolls.component';
import { ReportlistComponent } from './reportlist/reportlist.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasklistComponent } from './settings/tasklist/tasklist.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { OrganisationinfolistComponent } from './settings/dynamicsettings/organisationinfolist/organisationinfolist.component';
import { OrganisationinfoComponent } from './settings/dynamicsettings/organisationinfo/organisationinfo.component';
import { PaysliplistComponent } from './settings/paysliplist/paysliplist.component';
import { PayslipsComponent } from './settings/payslips/payslips.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'hrms',
      status: false
    },
    children: [
     
  {path: 'dashboard' , 
  component: DashboardComponent
},
      {
        path: 'reportlist',
        component: ReportlistComponent
      },
      
      {
        path: 'employeelist',
        component: EmployeelistComponent
      },
      {
        path: 'settings/setting',
        component: SettingComponent
      },
      {
        path:'calendar',
        component: CalendarComponent
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
        path: 'settings/dynamicsettings/orginfo/:id',
        component: OrganisationinfoComponent
      },
      {
        path: 'settings/dynamicsettings/orginfo',
        component: OrganisationinfoComponent
      },
      {
        path: 'settings/dynamicsettings/orginfolist',
        component: OrganisationinfolistComponent
      },
      {
        path: 'holidaylist',
        component: HolidaylistComponent
      },
      {
        path: 'leavelist',
        component: LeavelistComponent
      },
      
      {
        path: 'settings/dynamicsettings/designation/:id',
        component: DesignationComponent
      },
      {
        path: 'settings/dynamicsettings/designation',
        component: DesignationComponent
      },
      {
        path: 'settings/dynamicsettings/designationlist',
        component: DesignationlistComponent
      },
      {
        path: 'traininglist',
        component: TraininglistComponent
      },
      {
        path: 'interviewlist',
        component: InterviewsComponent
      },
      {
        path: 'projectlist',
        component: ProjectlistComponent
      },

     
      {
        path: 'noticetab/:id',
        component: NoticetabComponent
      },
      {
        path: 'noticetab',
        component: NoticetabComponent
      },
      {
        path: 'noticetablist',
        component: NoticetablistComponent
      },
      {
        path: 'settings/dynamicsettings/expenselist',
        component: ExpenselistComponent
      },
      {
        path: 'settings/dynamicsettings/travellist',
        component: TravellistComponent
      },
      {
        path: 'settings/dynamicsettings/travels/:id',
        component: TravelsComponent
      },
      {
        path: 'settings/dynamicsettings/travels',
        component: TravelsComponent
      },
      {
        path: 'settings/dynamicsettings/candidatelist',
        component: CandidatelistComponent
      },
      {
        path: 'settings/dynamicsettings/candidates/:id',
        component: CandidatesComponent
      },
      {
        path: 'settings/dynamicsettings/candidates',
        component: CandidatesComponent
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
        path: 'settings/history',
        component: HistoryComponent
      },
      {
        path: 'settings/leaveapprovelist',
        component: LeaveapprovelistComponent
      },
      {
        path: 'settings/leaveapproves',
        component: LeaveapprovesComponent
      },
      {
        path: 'settings/leaveapproves/:id',
        component: LeaveapprovesComponent
      },
      {
        path: 'settings/attendancelist',
        component: AttendancelistComponent
      },
      {
        path: 'settings/attendances/:id',
        component: AttendancesComponent
      },
      {
        path: 'settings/payrolllist',
        component: PayrolllistComponent
      },
      {
        path: 'settings/payrolls/:id',
        component: PayrollsComponent
      },
      {
        path: 'settings/payrolls',
        component: PayrollsComponent
      },
     
      {
        path: 'settings/paysliplist',
        component: PaysliplistComponent
      },
      {
        path: 'settings/payslips/:id',
        component: PayslipsComponent
      },
      {
        path: 'settings/payslips',
        component: PayslipsComponent
      },
      {
        path: 'settings/tasklist',
        component: TasklistComponent
      },
      {
        path: 'settings/tasks/:id',
        component: TasksComponent
      },
      {
        path: 'settings/tasks',
        component: TasksComponent
      },
      {
        path: 'settings/organisationlist',
        component: OrganisationlistComponent
      },
      {
        path: 'settings/organisations/:id',
        component: OrganisationsComponent
      },
      {
        path: 'settings/organisations',
        component: OrganisationsComponent
      },
      {
        path: 'settings/attendances',
        component: AttendancesComponent
      },
      {
        path: 'settings/editprofile',
        component: EditprofileComponent
      },
      {
        path: 'settings/changepassword',
        component: ChangepasswordComponent
      },

      {
        path: 'settings/dynamicsettings/employeestatuslist',
        component: EmployeestatuslistComponent
      },
      {
        path: 'settings/dynamicsettings/employeestatus/:id',
        component: EmployeestatusComponent
      },
      {
        path: 'settings/dynamicsettings/employeestatus',
        component: EmployeestatusComponent
      },
      {
        path: 'settings/dynamicsettings/leavetypelist',
        component: ConfigureleavelistComponent
      },
      {
        path: 'settings/dynamicsettings/leavetypes',
        component: ConfigureleavesComponent
      },
      {
        path: 'settings/dynamicsettings/leavetypes/:id',
        component: ConfigureleavesComponent
      },
      
      {
        path: 'settings/policylist',
        component: PolicylistComponent
      },
      {
        path: 'settings/policy/:id',
        component: PolicyComponent
      },
      {
        path: 'settings/policy',
        component: PolicyComponent
      },
      {
        path: 'settings/editformfields',
        component: EditformfieldsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HrmsRoutingModule { }
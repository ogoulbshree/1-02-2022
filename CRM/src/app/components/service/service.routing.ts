import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicecasesComponent } from './cases/ServiceCases.component';
import { ServiceCustomersComponent } from './customers/ServiceCustomers.component';
import { ServicedashboardComponent } from './dashboard/ServiceDashboard.component';
import { ServicefaqComponent } from './servicefaq/servicefaq.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CaselistComponent } from './caselist/caselist.component';
import { ServicefaqlistComponent } from './servicefaqlist/servicefaqlist.component';

import { HistoryComponent } from './settings/history/history.component';
import { SettingComponent } from './settings/setting/setting.component';
import { AdduserComponent } from './settings/usermanagement/adduser/adduser.component';
import { UserlistComponent } from './settings/usermanagement/userlist/userlist.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TicketingpageComponent } from './ticketingpage/ticketingpage.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'service',
      status: false
    },
    children: [
     
  {path: 'dashboard' , 
  component: ServicedashboardComponent
},


{
  path: 'customers/:id',
  component: ServiceCustomersComponent
},
{
  path: 'customers',
  component: ServiceCustomersComponent
},
{
  path: 'customerlist',
  component: CustomerlistComponent
},

  {path: 'cases' , 
  component: ServicecasesComponent
},

{
  path: 'cases/:id',
  component: ServicecasesComponent
},

{
  path: 'caselist',
  component: CaselistComponent
},

  {
    path: 'servicefaq/:id',
    component: ServicefaqComponent
  },
  {
    path: 'servicefaq',
    component: ServicefaqComponent
  },
  {
    path: 'servicefaqlist',
    component: ServicefaqlistComponent
  },

  {
    path: 'settings/history',
    component: HistoryComponent
  },
 
  {
    path: 'settings/setting',
    component: SettingComponent
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
    path: 'settings/editformfields',
    component: EditformfieldsComponent
  },

  {
    path: 'ticketdetails',
    component: TicketdetailsComponent
  },

  {
    path: 'ticketingpage/:id',
    component: TicketingpageComponent
  },
  {
    path: 'ticketingpage',
    component: TicketingpageComponent
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
    path: 'settings/changepassword',
    component: ChangepasswordComponent
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

export class ServiceRoutingModule { }
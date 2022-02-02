import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserpageComponent } from './adduserpage/adduserpage.component';
import { ContactedusersComponent } from './contactedusers/contactedusers.component';
import { ContacteduserspageComponent } from './contacteduserspage/contacteduserspage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequesteddemoComponent } from './requesteddemo/requesteddemo.component';
import { RequesteddemopageComponent } from './requesteddemopage/requesteddemopage.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TicketingpageComponent } from './ticketingpage/ticketingpage.component';
import { UsersComponent } from './users/users.component';
import { SettingComponent } from './settings/setting/setting.component';
import { HistoryComponent } from './settings/history/history.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { StatuslistComponent } from './settings/dynamicsettings/statuslist/statuslist.component';
import { StatusComponent } from './settings/dynamicsettings/status/status.component';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyslistComponent } from './surveyslist/surveyslist.component';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { PlanslistComponent } from './settings/dynamicsettings/planslist/planslist.component';
import { PlansComponent } from './settings/dynamicsettings/plans/plans.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'sales',
      status: false
    },
    children: [
      {
        path: 'dashboard' , 
        component: DashboardComponent 
      },
      {
        path: 'requesteddemo',
        component: RequesteddemoComponent
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
        path: 'contactedusers',
        component:ContactedusersComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'adduserpage',
        component: AdduserpageComponent
      },
      {
        path: 'adduserpage/:id',
        component: AdduserpageComponent
      },
      {
        path: 'requesteddemopage',
        component:  RequesteddemopageComponent
      },
      {
        path: 'requesteddemopage/:id',
        component:  RequesteddemopageComponent
      },
      {
        path: 'contacteduserspage/:id',
        component:   ContacteduserspageComponent
      },
      {
        path: 'contacteduserspage',
        component:   ContacteduserspageComponent
      },
      {
        path: 'settings/setting',
        component: SettingComponent
      },
      {
        path: 'settings/history',
        component: HistoryComponent
      },
      {
        path: 'settings/dynamicsettings',
        component: DynamicsettingsComponent
      },

      {
        path: 'settings/dynamicsettings/statuslist',
        component: StatuslistComponent
      },

      {
        path: 'settings/dynamicsettings/planslist',
        component: PlanslistComponent
      },



      {
        path: 'settings/dynamicsettings/plans:id',
        component: PlansComponent
      },
      
    
      {
        path: 'settings/dynamicsettings/plans',
        component:PlansComponent
      },
      {
        path: 'settings/dynamicsettings/status:id',
        component: StatusComponent
      },
      
    
      {
        path: 'settings/dynamicsettings/status',
        component:StatusComponent
      },
      {
        path: 'surveys/:id',
        component:SurveysComponent,
      },

      {
        path: 'surveys',
        component:SurveysComponent,
      },

      {
        path: 'settings/editformfields',
        component:EditformfieldsComponent,
      },
     
      {
        path: 'edit',
        component:SurveyslistComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OgoulRoutingModule { }
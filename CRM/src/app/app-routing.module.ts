import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
 import { NavbarComponent} from './components/navigation/navbar.component';

import { AuthGuard } from './gaurds/loginauth.gaurd'




const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    component: NavbarComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'sales/dashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'service/dashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'marketing/marketingdashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'inventory/dashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'hrms/dashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'crmwebsite/home',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'hrms/dashboard',
         pathMatch: 'full' 
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'helpdesk/dashboard',
         pathMatch: 'full' 
      },
      {
        path: 'marketing',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/marketing/marketing.module').then(m => m.MarketingModule)
      },
      {
        path: 'sales',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'service',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/service/service.module').then(m => m.ServiceModule)
      }, 

      {
        path: 'inventory',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/inventory/inventory.module').then(m => m.InventaryModule)
      }, 
      {
        path: 'hrms',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/hrms/hrms.module').then(m => m.HrmsModule)
      },
      {
        path: 'helpdesk',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/helpdesk/helpdesk.module').then(m => m.HelpdeskModule)
      },
     
      {
        path: 'service/dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/service/service.module').then(m => m.ServiceModule)
      }, 
      {
        path: 'marketing/marketingdashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/marketing/marketing.module').then(m => m.MarketingModule)
      }, 
     {
        path: 'inventory/dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/inventory/inventory.module').then(m => m.InventaryModule)
      }, 
     
      {
        path: 'hrms/dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/hrms/hrms.module').then(m => m.HrmsModule)
      },

      {
        path: 'helpdesk/dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/helpdesk/helpdesk.module').then(m => m.HelpdeskModule)
      },
      {
        path: 'ogoul',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/ogoul/ogoul.module').then(m => m.OgoulModule) 
      },
      
      // {path: 'service/dashboard' , component: ServicedashboardComponent,canActivate: [AuthGuard]},

  /* 
  {path: 'sales/dashboard' , component: SalesDashboardComponent,  canActivate: [AuthGuard]  },
  {path: 'sales/customers' , component: SalescustomersComponent,  canActivate: [AuthGuard]},
  {path: 'sales/salesdeals' , component: SalesdealsComponent,  canActivate: [AuthGuard]},
  {path: 'sales/salesproducts' , component: SalesproductsComponent,canActivate: [AuthGuard]},
  {path: 'sales/salesquote' , component: SalesquoteComponent,  canActivate: [AuthGuard]},


  {path: 'marketing/leads' , component: LeadsComponent,  canActivate: [AuthGuard]},
  {path: 'marketing/addcustomer' , component: AddcustomerComponent,canActivate: [AuthGuard]},
  {path: 'marketing/customerlist' , component: CustomerlistComponent,canActivate: [AuthGuard]},

  {path: 'marketing/addcustomer/:id' , component: AddcustomerComponent,canActivate: [AuthGuard]},
  {path: 'marketing/campaigns' , component: CampaignsComponent,canActivate: [AuthGuard]},
  {path: 'marketing/campaigns/:id' , component: CampaignsComponent,canActivate: [AuthGuard]},
  {path: 'marketing/campaignlist' , component: CampaignlistComponent,canActivate: [AuthGuard]},
  {path: 'marketing/marketingdashboard' , component: MarketingdashboardComponent,canActivate: [AuthGuard]},
  {path: 'marketing/addcontact' , component: AddcontactComponent,canActivate: [AuthGuard]},
  {path: 'marketing/leads/:id' , component: LeadsComponent,canActivate: [AuthGuard]},
  {path: 'marketing/addcontact/:id' , component: AddcontactComponent,canActivate: [AuthGuard]},
  {path: 'marketing/contactlist' , component:  ContactlistComponent,canActivate: [AuthGuard]},
  {path: 'marketing/leadslist' , component:  LeadslistComponent,canActivate: [AuthGuard]},
  {path: 'marketing/settings/userlist' , component:  UserlistComponent,canActivate: [AuthGuard]},
  {path: 'marketing/settings/history' , component:  HistoryComponent ,canActivate: [AuthGuard]},
  {path: 'marketing/settings/adduser' , component:  AdduserComponent,canActivate: [AuthGuard]},
  {path: 'marketing/settings/adduser/:id' , component:  AdduserComponent,canActivate: [AuthGuard]},
  {path: 'marketing/activitymanagement/activitylist' , component:  ActivitylistComponent,canActivate: [AuthGuard]},
  {path: 'marketing/activitymanagement/addactivity' , component:  AddactivityComponent,canActivate: [AuthGuard]},
  {path: 'marketing/activitymanagement/addactivity/:id' , component:  AddactivityComponent},
  {path: 'marketing/activitymanagement/addactivity/:parent_id' , component:  AddactivityComponent},
  {path: 'marketing/settings/setting' , component:  SettingComponent,canActivate: [AuthGuard]},
  {path: 'auth' , component:  AuthComponent,canActivate: [AuthGuard]},

  
  {path: 'service/dashboard' , component: ServicedashboardComponent,canActivate: [AuthGuard]},
  {path: 'service/cases' , component: ServicecasesComponent,canActivate: [AuthGuard]},
  {path: 'service/servicefaq' , component: ServicefaqComponent,canActivate: [AuthGuard]}, */

]
  },
/* {
  path: '',
  component: AuthComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: 'loginauth',
      loadChildren: () => import('./loginauth/loginauth.module').then(m => m.AuthModule)
    }
  ]
}, */
{
  path: '',
  component: AuthComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: 'website',
      loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
    }
  ]
},
{
  path: '**',
  redirectTo: ''
}];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


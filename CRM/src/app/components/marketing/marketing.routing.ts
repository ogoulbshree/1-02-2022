import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { FormsModule } from '@angular/forms';
import { EditformfieldsComponent } from './settings/editformfields/editformfields.component';
import { SourceComponent } from './settings/dynamicsettings/source/source.component';
import { DepartmentlistComponent } from './settings/dynamicsettings/departmentlist/departmentlist.component';
import { DepartmentComponent } from './settings/dynamicsettings/department/department.component';
import { SourcelistComponent } from './settings/dynamicsettings/sourcelist/sourcelist.component';
import { DynamicsettingsComponent } from './settings/dynamicsettings/dynamicsettings/dynamicsettings.component';
import { CampaigntypeComponent } from './settings/dynamicsettings/Campaign/campaigntype/campaigntype.component';
import { CampaignstatuslistComponent } from './settings/dynamicsettings/Campaign/campaignstatuslist/campaignstatuslist.component';
import { CampaignstatusComponent } from './settings/dynamicsettings/Campaign/campaignstatus/campaignstatus.component';
import { CampaigntypelistComponent } from './settings/dynamicsettings/Campaign/campaigntypelist/campaigntypelist.component';
import { ActiveComponent } from './settings/dynamicsettings/Campaign/active/active.component';
import { ActivelistComponent } from './settings/dynamicsettings/Campaign/activelist/activelist.component';
import { EditprofileComponent } from './settings/editprofile/editprofile.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { ReportlistComponent } from './reportlist/reportlist/reportlist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'marketing',
      status: false
    },

    
    children: [
      {
        path: 'activitymanagement/addactivity',
        component: AddactivityComponent
      },
      {
        path: 'activitymanagement/addactivity/:id',
        component: AddactivityComponent
      },
      {
        path: 'activitymanagement/activitylist',
        component: ActivitylistComponent
      },
      {
        path: 'addcontact',
        component: AddcontactComponent
      },
      {
        path: 'addcontact/:id',
        component: AddcontactComponent
      },
      {
        path: 'contactlist',
        component: ContactlistComponent
      },

      {
        path: 'addcustomer/:id',
        component: AddcustomerComponent
      },
      {
        path: 'addcustomer',
        component: AddcustomerComponent
      },
      {
        path: 'customerlist',
        component: CustomerlistComponent
      },
      {
        path: 'campaigns/:id',
        component: CampaignsComponent
      },
      {
        path: 'campaigns',
        component: CampaignsComponent
      },
      {
        path: 'campaignlist',
        component: CampaignlistComponent
      },
      {
        path: 'leads/:id',
        component: LeadsComponent
      },
      {
        path: 'leads',
        component: LeadsComponent
      },
      {
        path: 'leadslist',
        component: LeadslistComponent
      },
      {
        path: 'marketingdashboard',
        component: MarketingdashboardComponent
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
        path: 'settings/editformfields',
        component: EditformfieldsComponent
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
        path: 'settings/dynamicsettings/Campaign/active/:id',
        component: ActiveComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/active',
        component: ActiveComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/activelist',
        component: ActivelistComponent
      },



      {
        path: 'settings/dynamicsettings/Campaign/campaignstatus/:id',
        component: CampaignstatusComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/campaignstatus',
        component: CampaignstatusComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/campaignstatuslist',
        component: CampaignstatuslistComponent
      },


      {
        path: 'settings/dynamicsettings/Campaign/campaigntype/:id',
        component: CampaigntypeComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/campaigntype',
        component: CampaigntypeComponent
      },
      {
        path: 'settings/dynamicsettings/Campaign/campaigntypelist',
        component: CampaigntypelistComponent
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
        path: 'reports',
        component: ReportlistComponent
      },
      
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketingRoutingModule { }
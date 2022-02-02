import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddleadsComponent } from './addleads/addleads.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadslistComponent } from './leadslist/leadslist.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketslistComponent } from './ticketslist/ticketslist.component';




const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'helpdesk',
      status: false
    },
    children: [
      {
        path: 'dashboard' , 
        component: DashboardComponent 
      },
     
    
      {
        path: 'addleads',
        component: AddleadsComponent
      },
      {
        path: 'addleads/:id',
        component: AddleadsComponent
      },
      {
        path: 'leadslist',
        component: LeadslistComponent
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
        path: 'tickets/:id',
        component: TicketsComponent
      },
      {
        path: 'tickets',
        component: TicketsComponent
      },
      {
        path: 'ticketslist',
        component: TicketslistComponent
      },
     

    
   
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HelpdeskRoutingModule { }
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../loginauth/login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductsComponent } from './products/products.component';
import { ResourcesComponent } from './resources/resources.component';
import { SupportComponent } from './support/support.component';
import { RequestdemoComponent } from 'src/app/website/popup/requestdemo/requestdemo.component';
import { SurveyComponent } from 'src/app/website/popup/survey/survey.component';
import { ServicesComponent } from './services/services.component';
import { MarketingComponent } from './productslist/marketing/marketing.component';
import { SalesComponent } from './productslist/sales/sales.component';
import { ServiceComponent } from './productslist/service/service.component';
import { EditformfieldsComponent } from './website-page/editformfields/editformfields.component';
import { DashboardComponent } from './website-page/dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
    /*   {
        path: 'home',
        loadChildren: () => import("./home/home.module").then(m => m.BasicHomeModule)
      }, */
      {
        path: 'home' , 
        component: HomeComponent 
      },
      {
        path: 'products' , 
        component: ProductsComponent 
      },
      {
        path: 'aboutus' , 
        component: AboutusComponent 
      },
      {
        path: 'pricing' , 
        component: PricingComponent 
      },
      {
        path: 'contactus' , 
        component: ContactusComponent 
      },
     
      {
        path: 'support' , 
        component: SupportComponent 
      },
      {
        path: 'resources' , 
        component: ResourcesComponent 
      },
      {
        path: 'features' , 
        component: FeaturesComponent 
      },
      {
        path: 'services' , 
        component: ServicesComponent 
      },
       {
        path: 'popup/requestdemo' , 
        component: RequestdemoComponent 
      },
      {
        path: 'popup/survey' , 
        component: SurveyComponent 
      },

     

      {
        path: 'loginauth/login' , 
        component: LoginComponent 
      },


      {
        path: 'website-page/editformfields' , 
        component:EditformfieldsComponent 
      },

      {
        path: 'website-page/dashboard', 
        component:DashboardComponent
      },
      {
        path: 'productslist/marketing' , 
        component: MarketingComponent 
      },
      {
        path: 'productslist/sales' , 
        component: SalesComponent 
      },
      {
        path: 'productslist/service' , 
        component: ServiceComponent 
      },
  
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

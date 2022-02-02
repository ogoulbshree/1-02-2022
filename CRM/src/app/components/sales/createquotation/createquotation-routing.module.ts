import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {SimplePageComponent} from './simple-page.component';
import {CreatequotationComponent} from './createquotation.component';


const routes: Routes = [
  {
    path: 'createquotation',
    component: CreatequotationComponent,
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatequotationRoutingModule { }

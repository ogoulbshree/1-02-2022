import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login.component';
import {BasicLoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    FormsModule,
    
    ReactiveFormsModule
  ],
  // declarations: [LoginComponent]
})
export class BasicLoginModule { }

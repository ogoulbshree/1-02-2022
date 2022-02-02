
/* import { MenuItems } from './menu-items/menu-items'; */
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {CancelbuttonDirective} from 'src/app/components/cancelbutton.directive'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import {DataFilterPipe} from '../elements/data-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchfilterPipe } from '../components/searchfilter.pipe';
import {ToastyModule} from 'ng2-toasty';
import { CardComponent } from './card/card.component';
import { ParentRemoveDirective } from '../elements/parent-remove.directive';
import { CardRefreshDirective } from './card/card-refresh.directive';
import { CardToggleDirective } from './card/card-toggle.directive';

/* 
import { MenuItems } from './menu-items/menu-items'; */

@NgModule({
    declarations: [
      CancelbuttonDirective,
       SearchfilterPipe,
       CardComponent,
       DataFilterPipe,
       ParentRemoveDirective,
       CardRefreshDirective,
       CardToggleDirective,
    ],
    imports: [
      ToastyModule.forRoot(),
        CommonModule,
        TranslateModule,
    
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      Ng2SearchPipeModule,
    ],
    exports: [
        CommonModule,
        CancelbuttonDirective, 
        TranslateModule,
        CardComponent,
        FormsModule,
      ReactiveFormsModule,
      DataFilterPipe,
      DataTableModule
    ],
    providers: [  ],
    
})
export class SharedModule { }
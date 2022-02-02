import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends DynamicComponent implements  OnInit {
isShown:boolean = false;
  constructor(private translate: TranslateService,   private _route: ActivatedRoute,private _router: Router,public _uiservice:UiService, injector: Injector) { 
    
      super(GlobalConstants.CRM_LANDING_PAGE.NAVBAR,injector);
    
  }

  async ngOnInit() {
    await this.populateFields();
  }
  myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
  async onLanguageSelect(ev) {
   // console.log("ev.target;;;;;;;", ev.target);
    ///console.log("ev.target.value;;;;;;;", ev.target.value);
    
    GlobalConstants.CURRENT_MODULE = ev.target.value;

   // console.log("this.currentDashboard:::", this.currentDashboard);
    GlobalConstants.CURRENT_SELECTED_LANGUAGE = ev.target.value;
    this.myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
    this.translate.use(ev.target.value);
    this._uiservice.langDataSource.next(ev.target.value);
    await this.populateFields();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._route });

  }
  

 
}

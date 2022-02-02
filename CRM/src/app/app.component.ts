import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from './globalservice.service';
import { DBService } from './services/dbservice.service';
import { UiService } from './services/ui.service';
import {NavigationEnd,} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchTerm: string = "";

  
  constructor(
    private _dbService: DBService,
    private _router: Router,
    private _uiservice:UiService, private translate: TranslateService,
    )  {
      this.translate.addLangs(['en', 'ar','zh','es','fr','ru','ko','jp','tr']);
      this.translate.setDefaultLang('en');
      this._uiservice.langValue.subscribe(val => {
        this.translate.use(val);
      })
    }

  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

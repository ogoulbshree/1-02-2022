import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent  extends DynamicComponent implements  OnInit {
  freeTrialDays=0;
  constructor(injector: Injector,public _uiservice:UiService,) { 
    super(GlobalConstants.CRM_LANDING_PAGE.ABOUTUS,injector);
  }

 
  async ngOnInit() {
    await this.populateFields();
  }

  openDialog(){

  }

}

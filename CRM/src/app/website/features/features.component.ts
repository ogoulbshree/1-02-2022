
import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent extends DynamicComponent implements  OnInit {

  constructor(injector: Injector,public _uiservice:UiService,) { 
    super(GlobalConstants.CRM_LANDING_PAGE.FEATURES,injector,);
  }

  
  async ngOnInit() {
    await this.populateFields();
  }

}


import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent extends DynamicComponent implements  OnInit {

  constructor(injector: Injector,public _uiservice:UiService,) { 
    super(GlobalConstants.CRM_LANDING_PAGE.SERVICES,injector,);
  }

  
  async ngOnInit() {
    await this.populateFields();
  }

}

import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-dynamicsettings',
  templateUrl: './dynamicsettings.component.html',
  styleUrls: ['./dynamicsettings.component.css']
})
export class DynamicsettingsComponent extends DynamicComponent implements OnInit {

  constructor(injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DYNAMIC_SETTINGS,injector);
   }

  async ngOnInit() {
    await this.populateFields();
  }

}

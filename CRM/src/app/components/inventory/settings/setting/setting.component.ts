import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent extends DynamicComponent implements OnInit {

  constructor(injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SETTINGS,injector);
   }
 async ngOnInit() {
    await this.populateFields();
  }


}

import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { RequestdemoComponent } from 'src/app/website/popup/requestdemo/requestdemo.component';
import { SurveyComponent } from '../popup/survey/survey.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  extends DynamicComponent implements  OnInit {

  constructor(private modalService: NgbModal,  public _uiservice:UiService,injector: Injector) {
    super(GlobalConstants.CRM_LANDING_PAGE.NAVBAR,injector);
   }
  closeResult: string;
  
  async ngOnInit() {
   
    await this.populateFields();
  }
  survey() {
    this.modalService.open(SurveyComponent, {ariaLabelledBy: ''}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

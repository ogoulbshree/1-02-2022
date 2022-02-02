import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDetail } from 'src/app/models/CandidateDetails.model';
import { UiService } from 'src/app/services/ui.service';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';

@Component({
  selector: 'app-candidatesinfo',
  templateUrl: './candidatesinfo.component.html',
  styleUrls: ['./candidatesinfo.component.css']
})
export class CandidatesinfoComponent  extends DynamicComponent implements OnInit {
  candidateDetail;
  public candidate_id: string;
  constructor(private dialogRef: MatDialog,injector: Injector,
    public _uiservice: UiService) { 
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_INFO,injector);

    }

  async ngOnInit() {
    await this.populateFields();
    console.log(this.candidate_id);
    
    this.candidateDetail = new CandidateDetail();
    if (this.candidate_id) {
      this._dbService.getCandidate(this.candidate_id).subscribe(candidate => {
        console.log(candidate);
        if (candidate) {
          this.candidateDetail = candidate["data"]
        }
      })
    }
  }
  
  async submit() {
    this.candidateDetail.updated_by = this._dbService.getCurrentUserDetail().email;
    this.candidateDetail.modified_time = Date.now();
    try {
      
        let result = await this._dbService.updateCandidate(this.candidateDetail).toPromise();
        this.dialogRef.closeAll();
        
    }
    catch (error) {
      console.log("I am error", error);

    }


  }

}

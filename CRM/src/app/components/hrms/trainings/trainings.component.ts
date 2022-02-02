import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrainingDetail } from 'src/app/models/TrainingDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent extends DynamicComponent implements OnInit {
  trainingDetail = new TrainingDetail();
  training_type;
  public training_id: string;
  employeeArray: any;
  dateErrorFlag: Boolean= false;
 



  constructor(private dialogRef: MatDialog,private toast: ToastrService,private datepipe: DatePipe,public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAINING_LIST, injector);
  }

  async ngOnInit() {
    await this.populateFields();
    this.trainingDetail = new TrainingDetail();
    this._dbService.getAllEmployees().subscribe((x: any) => this.employeeArray = x.data)
    if (this.training_id) {
      this._dbService.getTrainingByID(this.training_id).subscribe(training => {
        if (training) {
          this.trainingDetail = training["data"]
        }
      })
    }
  }
  dateSelected() {
    if (this.trainingDetail.training_from && this.trainingDetail.training_to && new Date(this.trainingDetail.training_from) >= new Date(this.trainingDetail.training_to)) {
       this.dateErrorFlag = true
     }
     else if(new Date(this.trainingDetail.training_from) < new Date(this.trainingDetail.training_to)){
       this.dateErrorFlag = false
     }
   }
  async submit() {

    try {
      if (!this.dateErrorFlag) {
        if (this.training_id) {
          let obj = {
            training_id: this.trainingDetail.training_id,
            training_type: this.trainingDetail.training_type,
            trainer_name: this.trainingDetail.trainer_name,
            trained_employee_name: this.trainingDetail.trained_employee_name,
            training_cost: this.trainingDetail.training_cost,
            training_from: this.trainingDetail.training_from,
            training_to: this.trainingDetail.training_to,
            training_description: this.trainingDetail.training_description,
            training_status: this.trainingDetail.training_status,
            created_time: this.trainingDetail.created_time,
            modified_time: Date.now(),
            updated_by: this.trainingDetail.updated_by,
            created_by: this.trainingDetail.created_by,
          } as TrainingDetail
          this._dbService.updateTraining(obj).subscribe(x => {
            this.dialogRef.closeAll();
          });
        }
        else {
          let obj = {
            training_id:  Date.now(),
            training_type: this.trainingDetail.training_type,
            trainer_name: this.trainingDetail.trainer_name,
            trained_employee_name: this.trainingDetail.trained_employee_name,
            training_cost: this.trainingDetail.training_cost,
            training_from: this.trainingDetail.training_from,
            training_to: this.trainingDetail.training_to,
            training_description: this.trainingDetail.training_description,
            training_status: this.trainingDetail.training_status,
            created_time: Date.now(),
            modified_time: Date.now(),
            updated_by: this._dbService.getCurrentUserDetail().email,
            created_by: this._dbService.getCurrentUserDetail().email,
          } as TrainingDetail
          this._dbService.addTraining(obj).subscribe(x => {

            this.dialogRef.closeAll();

          });
        }
      }

    }
    catch (error) {
      console.log("I am error", error);

    }


  }

}

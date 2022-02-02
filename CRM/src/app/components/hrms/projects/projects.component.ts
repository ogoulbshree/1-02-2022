import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetail } from 'src/app/models/ProjectDetails.model';
import { DBService } from 'src/app/services/dbservice.service';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { Router } from '@angular/router';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DatePipe } from '@angular/common';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends DynamicComponent implements OnInit {
  projectDetail = new ProjectDetail();;
  training_type;
  public project_id: string;
  employeeArray = [];
  dateErrorFlag: Boolean = false;
  isUpdate: boolean = false;
  showError = "";
  optionsSelect= [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  selectedToTeam=[];
 


  constructor(private toast: ToastrService, private dialogRef: MatDialog, private datepipe: DatePipe, public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PROJECT_LIST, injector);
  }

  async ngOnInit() {
    await this.populateFields();
    this._dbService.getAllEmployees().subscribe(x => {
      this.employeeArray = x['data'];
    })
    // this.projectDetail = new ProjectDetail();
    if (this.project_id) {

      this._dbService.getProject(this.project_id).subscribe(training => {
        if (training) {
          this.projectDetail = training["data"];
          this.isUpdate = true;
        }
      })


    }
  }

  addToTeam(data){
    console.log(data);
    if(!this.selectedToTeam.find(x=>x == data))
    this.selectedToTeam.push(data)
    console.log(this.selectedToTeam);
    
  }
  removeFromTeam(evt){}
  async onSubmit() {
    // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
    this.projectDetail.updated_by = this._dbService.getCurrentUserDetail().email;

    /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.projectDetail.modified_time = Date.now();
    try {
      let result = null;
      if (this.isUpdate) {
        result = await this._dbService.updateProject(this.projectDetail).toPromise();
      }
      else {
        this.projectDetail.created_by = this._dbService.getCurrentUserDetail().email;
        /* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.projectDetail.created_time = Date.now();
        result = await this._dbService.addProject(this.projectDetail).toPromise();
      }
      //CustomLogger.logStringWithObject("addDepartment:result:", result);
      //  if (!this.isUpdate)
      //      CustomMisc.showAlert("Project Added Successfully");
      //  else
      //      CustomMisc.showAlert("Project Updated Successfully");
      this.dialogRef.closeAll();

      this.showError = "";

    }

    catch (error) {
      /* CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
      CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
      CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
      CustomLogger.logError(error.message);
       */
      CustomMisc.showAlert(error.error.message, true);
      this.showError = error.error.message;
    }

  }

}

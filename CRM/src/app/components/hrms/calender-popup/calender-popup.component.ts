import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { EmployeestatusDetail } from 'src/app/models/EmployeestatusDetails.model';
import { NoticetabDetail } from 'src/app/models/NoticeTabDetails.model';
@Component({
  selector: 'app-calender-popup',
  templateUrl: './calender-popup.component.html',
  styleUrls: ['./calender-popup.component.css']
})
export class CalenderPopupComponent  implements OnInit {
  public notice_id: string;
  first_name;
  noticeDetail;
  file;
  preview: string;
  profile_picture;
  form: FormGroup;
  closeDialogFlag:Boolean=false;
  designationDetail :any;
  employeestatusDetail : EmployeestatusDetail;
  totalLeavesAvailable: number=0;
  employeeArr=[];
  constructor(private dialogRef: MatDialog,public _dbService: DBService, public fb: FormBuilder, private _activatedRoute: ActivatedRoute,) {
    this.form = this.fb.group({
      name: [''],
      files: [null]
    })
  }


 
  async ngOnInit() {
    this.noticeDetail = new NoticetabDetail();
    if (this.notice_id) {
      // console.log("here",this.notice_id);

      this._dbService.getNoticetab(this.notice_id).subscribe((employee:any) => {
       
        if (employee) {
          this.noticeDetail = employee["data"]
        }
      })
    }
    // console.log(this.noticeDetail);



  }
  submit(){}
}

import { Component, Input, Injector,OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MarketingUserDetail } from 'src/app/models/MarketingUserDetail.model';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { LoginService } from 'src/app/services/loginService.service';
import { UiService } from 'src/app/services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { GlobalService } from 'src/app/services/global.service';
import {MatDialog} from '@angular/material/dialog';
import 'rxjs/Rx';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { RequesteddemoDetail } from 'src/app/models/Requesteddemo.model';
import { SurveysDetail } from 'src/app/models/SurveysDetail.model';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RequestdemoComponent } from 'src/app/website/popup/requestdemo/requestdemo.component';
import { SurveyComponent } from '../popup/survey/survey.component';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';

const currencyArr = require('../../../../public/global/currency.json');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends DynamicComponent implements  OnInit {
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog;
  popUpFlag = false
  isOpen = false;
  isDropdownOpen = false;
  // organisationName:string;
  // emailID:string;
  // password:string;
  // firstName:string;
  // lastName:string;
  organisationForm: FormGroup;
  submitted = false;
  dialogRef;
    @Input() name: string;
    
surveyDetail: SurveysDetail;
requestdemoDetail: RequesteddemoDetail

isUpdate = false;
fieldTextType: boolean;
closeResult: string;
currencyArray =[];
freeTrialDays;
  modalOptions:NgbModalOptions;
  constructor(
    private _router: Router, 
    public _uiservice:UiService, public dialog: MatDialog,private formBuilder: FormBuilder,
    private toastyService: ToastyService,private _loginService: LoginService,private _globalService: GlobalService,private modalService: NgbModal,injector: Injector )
    {
      super(GlobalConstants.CRM_LANDING_PAGE.HOMEPAGE,injector);
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
     
    }
   /*  async ngOnInit() {
     
  this._dbService.switchDB('ogoul_main_db').subscribe(x=>{
    this._dbService.getFreeTrialDays().subscribe((x:any)=>{
      if(x)
      this.freeTrialDays =x.data[0].freeTrialDays; 
    })
  })
  
  this.addCurrencies()
    
     
   
    this.organisationForm = this.formBuilder.group({
      organisationName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      currency: ['', [Validators.required]],
  }, {
     
  });
   
  } */

  async ngOnInit() {
   
      await this.populateFields();
  
  
//   this.organisationForm = this.formBuilder.group({
//     organisationName: ['', Validators.required],
//     firstName: ['', Validators.required],
//     lastName: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(6)]],
//     phone: ['', [Validators.required, Validators.minLength(6)]],
//     currency: ['', [Validators.required]],
// }, {
//     // validator: MustMatch('password', 'confirmPassword')
// });
 
}
  onSubmit() {
    console.log(this.organisationForm);
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.organisationForm.invalid) {
        return;
    }
    else{
      this.dialogRef.close()
    let formData = {
      organisationName: this.organisationForm.value.organisationName,
      firstName:this.organisationForm.value.firstName ,
      lastName:this.organisationForm.value.lastName,
      email:this.organisationForm.value.email ,
      password: this.organisationForm.value.password,
      phone: this.organisationForm.value.phone,
      currency:this.organisationForm.value.currency,
     }
    if(formData){
        this._dbService.createNewDB(formData).subscribe((x:any)=>{
          console.log("I am x",x);

          if(x.message="Success" && x.data == "DB Created"){
            
              alert(`Organaisation account created successfully`);
          }
          else if(x.data == "Organisation / Email Already Exists")
          {
            alert("Organisation / Email  already exists.Please try again")
          }
          else {
            alert("Some thing went wrong")
          }
         
         
          
        })
    }
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.organisationForm.value, null, 4));
}
get f() { return this.organisationForm.controls; }

  openDialog() {
     this.dialogRef = this.dialog.open(this.callAPIDialog,{
  width: '600px',

    });

    
  }
  filterData(){
    console.log("here I am ")
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  requestdemo() {
    this.modalService.open(RequestdemoComponent, {ariaLabelledBy: ''}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

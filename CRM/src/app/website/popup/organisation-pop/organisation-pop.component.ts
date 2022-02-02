import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrgDetail } from 'src/app/models/OrganizationCreateDetail.model';
import { DBService } from 'src/app/services/dbservice.service';
import { RequestdemoComponent } from '../requestdemo/requestdemo.component';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
const currencyArr = require('../../../../../public/global/currency.json');

@Component({
  selector: 'app-organisation-pop',
  templateUrl: './organisation-pop.component.html',
  styleUrls: ['./organisation-pop.component.css']
})
export class OrganisationPopComponent extends DynamicComponent implements OnInit {
  organisationForm: FormGroup;
  currencyArray = [];
  submitted = false;
  dialogRef;
  freeTrialDays;
  closeResult: string;
  organisationDetail: OrgDetail;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog;
  constructor(public dialog: MatDialog, private modalService: NgbModal, private formBuilder: FormBuilder, injector: Injector, public _uiservice: UiService) {
    super(GlobalConstants.CRM_LANDING_PAGE.HOMEPAGE, injector);
  }
  async ngOnInit() {
    // console.log("here I am ")
    await this.populateFields();
  
    this.organisationDetail = new OrgDetail();
    let userDetailsArray = [],userDetailsSales=[],userDetailsService=[],userDetailsMarketing=[],userDetailsInventory=[],userDetailsHrms=[];
    if(JSON.parse(localStorage.getItem('userDetailSales')))
    userDetailsSales= JSON.parse(localStorage.getItem('userDetailSales'))
    if(JSON.parse(localStorage.getItem('userDetailService')))
    userDetailsService=JSON.parse(localStorage.getItem('userDetailService'))
    if(JSON.parse(localStorage.getItem('userDetailsMarketing')))
    userDetailsMarketing=JSON.parse(localStorage.getItem('userDetailsMarketing'))
    if(JSON.parse(localStorage.getItem('userDetailsInventory')))
    userDetailsInventory=JSON.parse(localStorage.getItem('userDetailsInventory'))
    if(JSON.parse(localStorage.getItem('userDetailsHrms')))
    userDetailsHrms=JSON.parse(localStorage.getItem('userDetailsHrms'))
   
    userDetailsArray = [...userDetailsSales,...userDetailsService,...userDetailsMarketing,...userDetailsInventory,...userDetailsHrms]

    if(userDetailsArray.length>0){
      for(let i=0; i<userDetailsArray.length; i++){
        
          this._dbService.switchDB('ogoul_main_db').subscribe( (data: any) => {
          this._dbService.switchDBUsers(userDetailsArray[i].created_by, userDetailsArray[i].email).subscribe(async (res: any) => {})
          this._dbService.getFreeTrialDays().subscribe((x:any)=>{
            if(x)
            this.freeTrialDays =x.data[0].freeTrialDays; 
          })
      })
    
      }
    }
    else{
      // console.log("here I am ")
      this._dbService.switchDB('ogoul_main_db').subscribe(data=>{
        // console.log(data)
      if(data['data']){
        this._dbService.getFreeTrialDays().subscribe((x:any)=>{
          if(x)
          this.freeTrialDays =x.data[0].freeTrialDays; 
        })
      }
      
    })
}

    this.organisationForm = this.formBuilder.group({
      organisationName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      currency: ['', [Validators.required]],
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
    this.addCurrencies()
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.callAPIDialog, {
      width: '600px',

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
  requestdemo() {
    this.modalService.open(RequestdemoComponent, { ariaLabelledBy: '' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addCurrencies() {

    Object.values(currencyArr).map((value, data) => {
      this.currencyArray.push(value);
    });

  }
  onSubmit(f) {
    // console.log(this.organisationForm);

    this.submitted = true;

    // stop here if form is invalid

    this.dialogRef.close()
    let formData = {
      organisationName: this.organisationDetail.org_detail_name.replace(' ',''),
      firstName: this.organisationDetail.org_detail_fname,
      lastName: this.organisationDetail.org_detail_lname,
      email: this.organisationDetail.org_detail_email,
      password: this.organisationDetail.org_detail_password,
      phone: this.organisationDetail.org_detail_phone,
      currency: this.organisationDetail.org_detail_currency,
    }
    if (formData) {
      this._dbService.createNewDB(formData).subscribe((x: any) => {
        // console.log("I am x", x);

        if (x.message = "Success" && x.data == "DB Created") {
          f.form.reset();
          alert(`Organaisation account created successfully`);
          this.ngOnInit();
        }
        else if (x.data == "Organisation / Email Already Exists") {
          alert("Organisation / Email  already exists.Please try again")
        }
        else {
          alert("Some thing went wrong")
        }



      })
    }


    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.organisationForm.value, null, 4));
  }
}

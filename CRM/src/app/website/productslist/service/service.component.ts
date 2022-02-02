import { Component, Injector, OnInit, Inject, LOCALE_ID,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrgDetail } from 'src/app/models/OrganizationCreateDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { RequestdemoComponent } from '../../popup/requestdemo/requestdemo.component';
const currencyArr = require('../../../../../public/global/currency.json');

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent extends DynamicComponent implements OnInit{
  freeTrialDays = 0;
  dialogRef;
  f;
  currencyArray = [];
  organisationDetail: OrgDetail;
  organisationForm: FormGroup;
  submitted = false;
  closeResult: string;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog;
  constructor(private formBuilder: FormBuilder,private modalService: NgbModal,public dialog: MatDialog, injector: Injector,public _uiservice:UiService,) {
    super(GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_SERVICE, injector);
  }

    async ngOnInit() {
      await this.populateFields();
      this.organisationDetail = new OrgDetail();
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
    this._dbService.switchDB('ogoul_main_db').subscribe(x => {
      this._dbService.getFreeTrialDays().subscribe((x: any) => {
        if (x)
          this.freeTrialDays = x.data[0].freeTrialDays;
      })
    })
    this.addCurrencies()
  }
  addCurrencies() {

    Object.values(currencyArr).map((value, data) => {
      this.currencyArray.push(value);
    });

  }
  openDialog() {
    this.dialogRef = this.dialog.open(this.callAPIDialog, {
      width: '600px',
    });
  }
  requestdemo() {
    this.modalService.open(RequestdemoComponent, {ariaLabelledBy: ''}).result.then((result) => {
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
  onSubmit(f) {
    // console.log(this.organisationForm);

    this.submitted = true;

    // stop here if form is invalid

    this.dialogRef.close()
    let formData = {
      organisationName: this.organisationDetail.org_detail_name,
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

import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
import { PayRollDetail } from 'src/app/models/PayRollDetails.model';
import { DBService } from 'src/app/services/dbservice.service';
declare const require: any;
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
require('jspdf-autotable');

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss']
})
export class PayslipsComponent extends DynamicComponent implements OnInit {

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  employeeDetail: EmployeeDetail;
  selectedEmployee;
  monthSelected: any;
  yearSelected: any;
  selectedUserPay: PayRollDetail;
  form: FormGroup;
  buttonDisableFlag: boolean;
  constructor(private _router: Router, public fb: FormBuilder, private _activatedRoute: ActivatedRoute, injector: Injector,public _uiservice:UiService,) 
  {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYSLIP,injector);
    this.form = this.fb.group({

      name: [''],
      files: [null]
    });
    const navigation = this._router.getCurrentNavigation();
    // console.log(navigation);
    this.monthSelected = navigation.extras.state.monthSelected
    this.yearSelected = navigation.extras.state.yearSelected
    this.employeeDetail = JSON.parse(navigation.extras.state.employee);
  }

  async ngOnInit() {
await this.populateFields();
    this._dbService.getPayrollByEmployeeID(this.employeeDetail.employee_id).subscribe(x => {
      this.selectedUserPay = x["data"];
    })
  }

  downloadPDF() {
    //   var pdf = new jsPDF('p', 'pt', 'a4');
    //   pdf.addHTML(this.content.nativeElement, function() {
    //     pdf.save("obrz.pdf");
    //  });
    html2canvas(this.content.nativeElement)
      .then((canvas) => {
        // console.log(canvas.toDataURL());

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'pt',
          format: 'a4'
        });
        pdf.text(250, 20, 'PaySlip');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 5, 40, pdfWidth, pdfHeight);
        // console.log(pdf);

        pdf.save('PaySlip.pdf');
      });
    // const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open({}, window);
  }
  sendPdf(email) {
   this.buttonDisableFlag = true;
    html2canvas(this.content.nativeElement)
      .then((canvas) => {
        // console.log((canvas));

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'pt',
          format: 'a4'
        });
        pdf.text(250, 20, 'PaySlip');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 5, 40, pdfWidth, pdfHeight);

        // console.log(btoa(pdf));
        // pdf.save('PaySlip.pdf');
        var reader = new FileReader();
        reader.readAsDataURL(pdf.output('blob'));
        reader.onloadend =  () => {
          var base64data:any = reader.result;
          // console.log(base64data);
          // console.log(base64data.split(",").pop());
          let obj = {
            base64: base64data.split(",").pop(),
            email: email
          };
        
           this._dbService.sendMailToEmployee((obj)).subscribe(x => {
            //  console.log(x["data"]);
             if(x["data"])
            {
              this.buttonDisableFlag = false;
              alert("Email Send");
            }
           
            else
            alert('Something went wrong')
      
          })
        }

      });

  }

}

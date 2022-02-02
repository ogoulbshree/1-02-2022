import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { TrainingsComponent } from '../trainings/trainings.component';
const jsPDF = require('jspdf');
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-traininglist',
  templateUrl: './traininglist.component.html',
  styleUrls: ['./traininglist.component.css']
})
export class TraininglistComponent extends DynamicComponent  implements OnInit {
  trainingArr=[];
  SHOW_EDIT_DELETE = true;
  key: string = 'id'
  reverse: boolean = true;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  p:number =1;
  training_type: any;
  model: any = {
    fromDate: "",
    toDate: ""
  };
  date;
  filteredTableDataArr: any;
  leaveCount:number = 0;
  dateFormat = "dd MMM yyyy";
  constructor(private toast: ToastrService,private datepipe: DatePipe,public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAINING_LIST, injector);
  }

  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Admin ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    ) 
	
	{
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    else if
    (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Admin ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager)
    {
    
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = false;
        this.ALL_DELETE_ALLOWED = false;
    
    
  }
  
      this.CAN_ADD = false;
    /*   let result = await this._dbService.getAllUsers().toPromise(); */
   
  }
 async ngOnInit() {
    await this.init();
    await this.populateFields();
    this._dbService.getAllTrainings().subscribe(trainings => {
      this.trainingArr = trainings["data"];
      this.filteredTableDataArr= trainings["data"];
    })
  }
  searchData(type) {
    
    if (type == 'clear' && !this.training_type) this.ngOnInit();
    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.training_type, 'training').subscribe((x: any) => {
        console.log("I am res",x.data);
        
        this.trainingArr = x.data;
        this.filteredTableDataArr= x["data"];
      }
      );
  }
  openAddTraining() {
    const dialogRef = this.dialog.open(TrainingsComponent, { width: "400px" });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  async onClickDelete(obj, page) {
    if (confirm("Are you sure to delete " + obj.training_type)) {
      await this._dbService.deleteTraining(obj).toPromise();
      this.ngOnInit();
    }
  }
  pageChanged(evt){

  }
  onClickEdit(item) {
    const dialogRef = this.dialog.open(TrainingsComponent, { width: "400px" });
    dialogRef.componentInstance.training_id = item.training_id;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  filterData() {
    if (this.model.fromDate == '' || this.model.toDate == '') {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }

    if ((this.model.fromDate != '' && this.model.toDate != '') && (this.model.toDate) < (this.model.fromDate)) {
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }

    else {
      this.filteredTableDataArr = [];
      let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      
      for (let i = 0; i < this.trainingArr.length; i++) {
        var dt: any = this.datepipe.transform(this.trainingArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          this.filteredTableDataArr.push(this.trainingArr[i]);
        }

      }
    }
  }
  async downloadPdf() {
    let data = null;
    let result = await this._dbService.getAllTrainings().toPromise();
    this.trainingArr = result["data"];
    const doc = new jsPDF();
    let fileName = "TrainingList.pdf";
    fileName = "TrainingList.pdf";
    //data = document.getElementById('content2');
    const col = ["Training Type", "Training name", "Employee", "Cost", "From","To","Description"];
    const rows = [];

    for (let k = 0; k < this.trainingArr.length; k++) {
      var temp = [this.trainingArr[k].training_type,
      this.trainingArr[k].trainer_name, this.trainingArr[k].trained_employee_name,
      this.trainingArr[k].training_cost, this.trainingArr[k].training_from,
      this.trainingArr[k].training_to,
      this.trainingArr[k].training_description

      ];
      rows.push(temp);
    }
    const header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(30);
      doc.getFontList('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Report for Customer List", data.settings.margin.left, 50);
    }; doc.autoTable(col, rows, {
      theme: 'grid',
      /*  theme: 'striped' */
      styles: {
        halign: 'right',
      },
      headerStyles: {
        fillColor: [0, 65, 69], halign: 'center'
      },
      margin: { top: 60 }, beforePageContent: header,

      columnStyles: {
        0: { halign: 'left' }
      },


    });

    doc.save(fileName);

  }
  async generateCsv() {
    let result = await this._dbService.getAllTrainings().toPromise();
    this.trainingArr = result["data"];
    this.downloadFile(this.trainingArr, 'TrainingList');
  }
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        if (!array[i][head]) {
          array[i][head] = '';
        }
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
  downloadFile(data, filename = 'data') {
    let csvData = this.ConvertToCSV(data, [
      'training_type',
      'trainer_name',
      'trained_employee_name',
      'training_cost',
      'training_from',
      'training_to',
      'training_description',]);
    // console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
sort(data){

}
}

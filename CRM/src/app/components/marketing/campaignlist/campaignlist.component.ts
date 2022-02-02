import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { CampaignDetail } from 'src/app/models/CampaignDetail.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent  extends DynamicComponent implements OnInit {

  
  campaignDataArr :CampaignDetail[]= [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
   filterQuery = ""
   rowsOnPage = 5;
  fromDate;
  toDate;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;

   in_progress: number = 0;
   created: number = 0;
   on_hold: number = 0;
   closed:number =0;


   model: any = {
    fromDate: "",
    toDate:""
   };
   
   campaign_owner :any;
   
   p:number =1;
	 
   date = new Date;
   
   @ViewChild('csv', {static: false}) modal; 
   invalid_file: boolean = true;
   file_obj: any[];
   file: HTMLInputElement;
   campaignDetailcount: number=0
  constructor( private _router: Router,injector: Injector, public _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe) { 
    super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS,injector);
  }
 /*  async init() {
    let result = await this._dbService.getAllCampaign().toPromise();
    console.log("result:", result);
    this.campaignDataArr = result["data"];
    this.filteredTableDataArr = this.campaignDataArr;
  } */


  
  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_Manager 
    )
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }

  this.CAN_ADD = false;
  let result = await this._dbService.getAllCampaign(1).toPromise();
    //console.log("result:", result);
    this.campaignDataArr = result["results"];
    this.filteredTableDataArr = this.campaignDataArr;
    this.campaignDetailcount = result["count"];
    this.calculate_occurence();
  }
   
  async ngOnInit() {
  await this.init();
  await this.populateFields();
  this.calculate_occurence();
  }

  onClickEdit(obj) {
    this._router.navigate(['/marketing/campaigns', obj.campaign_id]);
  }

 

  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.campaign_owner)) {
      await this._dbService.deleteCampaign(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

	
	
  filterData() {
    if (this.model.fromDate == '' || this.model.toDate == '') 
    {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    } 
  
    if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
  
    else {
      this.filteredTableDataArr = [];
      let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      for (let i = 0; i < this.campaignDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.campaignDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.campaignDataArr[i]);
        }
       
      }
    }
  }



  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [
           'campaign_owner',
           'campaign_name',
           'active',
           'type',
           'status',
           'start_date',
           'end_date',
           'expected_revenue_in_campaign',
           'budgeted_cost_in_campaign',
           'actual_cost_in_campaign',
           'expected_response_percent',
           'description_info',
         ]);
      //console.log(csvData)
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
        if(!array[i][head]) {
          array[i][head] = '';
        }
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv(){
    let result = await this._dbService.getAllCampaignList().toPromise();
    this.campaignDataArr = result["data"];
    this.downloadFile(this.campaignDataArr, 'campaignlist');
    }

   exportToPrint() {
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
       
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf ('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;
  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('Campiagn.pdf'); // Generated PDF   
      });
    } 

    
    async downloadPdf() {
      let result = await this._dbService.getAllCampaignList().toPromise();
      this.campaignDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "Campiagn.pdf";
      if (this.flagShowUserReport) {
        fileName = "Campiagn.pdf";
        //data = document.getElementById('content2');
        const col = ["Campiagn Owner", "Campaign Name","Active","Type"];
        const rows = [];
  
        for (let k = 0; k < this.campaignDataArr.length; k++) {
          var temp = [ this.campaignDataArr[k].campaign_owner,
          this.campaignDataArr[k].campaign_name, this.campaignDataArr[k].active,this.campaignDataArr[k].type
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.setFont('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Campiagn List", data.settings.margin.left, 50);
        };  doc.autoTable(col, rows, {
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
  
    }

    calculate_occurence(){
      this.created = 0;
      this.in_progress = 0;
      this.on_hold = 0;
      this.closed = 0;
      for (let i = 0; i < this.filteredTableDataArr.length; i ++){
        if(this.filteredTableDataArr[i].status){
          let status = this.filteredTableDataArr[i].status.toLowerCase();
          if(status.includes("on hold")){
            this.on_hold++;
          }else if(status.includes("created")){
            this.created++;
          }else if(status.includes('in progress')){
            this.in_progress++;
          }
          else if(status.includes('closed')){
            this.closed++;
          }
        }
      }
    }
    
      
    upload(event: Event){
      //get the file target
      this.file = event.target as HTMLInputElement
      //get file variable
      let fileToUpload = this.file.files.item(0);
      
      //check if file is csv
      if(fileToUpload.name.includes('.csv')){
        
        this.invalid_file = false;
        let fr = new FileReader();
        //read file callbacak
        fr.onload =  (e) => {
          //results
          let res = fr.result as string;
          //split on new line
          let lines = res.split('\n');
          this.file_obj = [];
  
            for(let i = 1; i < lines.length; i++){
              //split on comma
              let values = lines[i].split(',');
              if(values && lines[i]){
                //create obj based on csv values
                let obj = {
                  campaign_owner: values[0],
                  campaign_name: values[1],
                  active: values[2],
                  type: values[3],
                  status: values[4],
                  start_date: values[5],
                  end_date: values[6],
                  expected_revenue_in_campaign: values[7],
                  budgeted_cost_in_campaign: values[8],
                  actual_cost_in_campaign: values[9],
                  expected_response_percent: values[10],
                  description_info: values[11],
                  campaign_id: Date.now() + i - 1,
                  created_time: Date.now(),
                  modified_time: Date.now(),
                  created_by: this._dbService.getCurrentUserDetail().email,
                  updated_by:this._dbService.getCurrentUserDetail().email
                } as CampaignDetail;
                //push to array
                this.file_obj.push(obj);
              }
            }
          }
  
          //read file
          fr.readAsText(fileToUpload);
      }
      else{
        this.invalid_file = true;
      }
    }
  
  save(){
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence
   

    //add deals to db
    this._dbService.addMultipleCampiagn(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
  }
  searchData(type){
    if(type == 'clear'&& !this.campaign_owner)this.ngOnInit();
    
    else if(type == 'search') 
     this._dbService.getAllGlobalSearchByKeywordAndSection(this.campaign_owner,'campaign').subscribe((x: any)=>{
        this.filteredTableDataArr =x.data;
        this.campaignDetailcount =  x.data.length;
       
     }
     );
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllCampaign(event).subscribe((res:any) => {
        // console.log(res)
  
        this.campaignDataArr=res.results
        
        this.filteredTableDataArr = this.campaignDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  }
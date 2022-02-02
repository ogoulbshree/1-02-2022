
import { Component, Injector, OnInit, Inject, LOCALE_ID,ViewChild} from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';

@Component({
  selector: 'app-addvisitslist',
  templateUrl: './addvisitslist.component.html',
  styleUrls: ['./addvisitslist.component.css']
})
export class AddvisitslistComponent extends DynamicComponent implements OnInit {

  addVisitCount : number = 0;
  email: any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastyService: ToastyService,
    private _router: Router,
    public _uiservice: UiService,injector: Injector) {

      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_VISITS,injector);
     }
  userObj;
  fromDate;
  toDate;
  searchText;
  
 
  p:number =1;
    
  first_name :any;
  filterQuery = ""
   rowsOnPage = 5;
  CustomerUsers:any;
  title = 'AGMMapAngular';
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  latitude: number;
  longitude: number;
  zoom: number = 10;
  private geoCoder;
  keyword = 'email';
  visitLists;
  allVisitLists;
  isNoRecords:boolean = false;

  selectedDate;
  filteredTableDataArr: any;
  objectDetails: ObjectDetail[];
  
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  flagShowUserReport
  

  uidEmailMap = new Map();
    async initEmailUidMap() {      
      let result = await this._dbService.getUidsAndEmail();
     this.uidEmailMap = result["data"]; 
    
    //  this.uidEmailMap.set("a", "apple");
    //   this.uidEmailMap.set("b", "boy");
    }


  async init() {
    this.initEmailUidMap();
  

      if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
      
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User
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
    let result = await this._dbService.getAllVisits1(1).toPromise();
   // console.log("result:", result);
    this.allVisitLists = result["results"];
    this.addVisitCount = result["count"];
    this.visitLists = result["results"];
  }
 
  getAppropriateVisits() {
   /*
    CustomLogger.logString("USER TYPE::" + this._dbService.getCurrentUserDetail().usertype);
   */
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales) {
      this._dbService.getVisitsOfSalesUser().subscribe(res => {
        if (res) {
          this.allVisitLists = res["data"];
          this.visitLists = res["data"];
        }
      });
    } else {
      this._dbService.getAllVisits1(1).subscribe(res => {
       // CustomLogger.logStringWithObject("VISITS OF VENDOR", res);
        if (res) {
         // CustomLogger.logStringWithObject("ADDING", res["data"]);
          this.allVisitLists = res["results"];
          this.visitLists = res["results"];
        }
      });
    }}
    getEmailFromUid( uid){
      return this.uidEmailMap.get(uid);
      // return "ddddd";
    }


  async ngOnInit() {
   await this.init();
   await this.populateFields();
    //naveen - load map and set current location of user
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // this.geoCoder = new google.maps.Geocoder;
    });
    
    //console.log("this._dbService.getCurrentUserDetail() ::", this._dbService.getCurrentUserDetail());
     //console.log("this._dbService.getCurrentUserDetail().usertype ::", this._dbService.getCurrentUserDetail().usertype);
    


    //naveen - get all visits from db
   
    //naveen - get all sales users to populate in autocomplete dropdown 
   
    }
 
    searchVisits1() {
      let email;
      if (this.userObj) {
        email = this.userObj.email;
      } else {
        email = '';}
    let filter = {
      email: email,
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  // end of the day timestamp
    };
    let filteredVisits = [];
    if(!this.userObj && !this.fromDate && !this.toDate){
      filteredVisits = this.allVisitLists;
    }else if(this.userObj && !this.fromDate && !this.toDate){
      //console.log(filter);
      for(let i = 0; i< this.allVisitLists.length; i++){
        if(this.allVisitLists[i].email== filter.email){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && !this.toDate){
      for(let i = 0; i < this.allVisitLists.length; i++){
        if(this.allVisitLists[i].visit_id > filter.from){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && !this.fromDate && this.toDate){
      for(let i = 0; i < this.allVisitLists.length; i++){
        if(this.allVisitLists[i].visit_id < filter.to){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this.allVisitLists.length; i++){
          if((this.allVisitLists[i].visit_id > filter.from) && (this.allVisitLists[i].visit_id < filter.to) )
          filteredVisits.push(this.allVisitLists[i]);
      }
    }else if(this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this.allVisitLists.length; i++){
        if(this.allVisitLists[i].email == filter.email){
          if((this.allVisitLists[i].visit_id > filter.from) && (this.allVisitLists[i].visit_id < filter.to) )
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }
    this.visitLists = filteredVisits;
  }
  searchVisits(type) {
    if(type == 'clear' && !this.email)this.ngOnInit();
    else if(type == 'search')
    {
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.email,'userEmailAddVisits').subscribe((x: any)=>{ this.visitLists  =x.data;
      ;});
    }
  }
  
  selectEvent(customer) {
    
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
  mapClicked(e){

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  //naveen - show the marker information on click
  onClickMarker(infoWindow, $event: MouseEvent){
    infoWindow.open();
  }
  openMapInNewTab(lat,long){
    let url = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long;
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
   //naveen - hide the marker information on hover out
  mouseOutMarker(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  //naveen - on edit of visit, redirect to add visit page with visit_id
  onClickEdit(obj) {
    this._router.navigate(['/sales/addvisits', obj.visit_id]);
  }
  //naveen - delete a particular visit
  onClickDelete(obj){
    if(confirm("Are you sure to delete "+obj.first_name)) {
      this._dbService.deleteVisit({visit_id: obj.visit_id}).subscribe(res =>{
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      });
    
      this.getAppropriateVisits();
    }
  }

 

  //naveen - to show alerts at completion or failure of actions
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
       // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
      //  console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }

 
downloadFile(data, filename = 'data') {
  if (this.flagShowUserReport) {
    let csvData = this.ConvertToCSV(data, ['created_by','first_name','last_name','email','phone']);
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

      line += ',' + array[i][head];
    }
    str += line + '\r\n';
  }
  return str;
}

generateCsv(){
  this.downloadFile(this.allVisitLists,'Addvistslist');
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
      pdf.save('Addvistlist.pdf'); // Generated PDF   
    });
  } 



  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Addvisitlist.pdf";
    if (this.flagShowUserReport) {
      fileName = "Addvisitlist.pdf";
      //data = document.getElementById('content2');
      const col = [ "User Email", "First Name","Last Name","Email","Phone"];
      const rows = [];

      for (let k = 0; k < this.allVisitLists.length; k++) {
        var temp = [ this.allVisitLists[k].created_by,
        this.allVisitLists[k].first_name,this.allVisitLists[k].last_name,
        this.allVisitLists[k].email,this.allVisitLists[k].phone

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.getFontList('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Add Vist", data.settings.margin.left, 50);
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
  searchData(type){
 
 
    if(type == 'clear' && !this.first_name)this.ngOnInit();
    else if(type == 'search')
    {
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name,'customers').subscribe((x: any)=> this.visitLists  =x.data);
    }
     
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllVisits1(event).subscribe((res:any) => {
        // console.log(res)
        this.allVisitLists=res.results;
        this.visitLists=res.results;
      })

    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
    
}
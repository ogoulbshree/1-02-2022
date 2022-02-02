import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';

require('jspdf-autotable');
import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-supplierslist',
  templateUrl: './supplierslist.component.html',
  styleUrls: ['./supplierslist.component.css']
})
export class SupplierslistComponent extends  DynamicComponent implements OnInit {
  filter: { from: number; to: number; };
  supplierErrorArray=[];

 
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, injector:Injector,
    private datepipe: DatePipe,
    public _uiservice: UiService,
    private toast: ToastrService) 
    { 

      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER,injector) 
    }
 isUpdate = false;
 suppliernameDetail : SuppliernameDetail;
 filteredTableDataArr: any;
 flagShowProductReport = true;
 suppliernameDataArr = [];
 searchText;
 supplier_name :any;
 p:number =1;
  filterQuery = ""
  rowsOnPage = 5;
  date = new Date;
  @ViewChild('csv', {static: false}) modal; 
  invalid_file: boolean = true;
  file_obj: any[];
  file: HTMLInputElement;
 ALL_DELETE_ALLOWED = true;
 CAN_ADD = true;
 SHOW_ICONS = true;
 SHOW_EDIT_DELETE = true;
 model: any = {
  fromDate: "",
  toDate:""
 };
 supplierDetailcount:number=0;

 async init() {
  
   if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
   
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
   ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
   ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager||
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User||
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
   ){
     this.SHOW_ICONS = false;
     this.SHOW_EDIT_DELETE = true;
     this.ALL_DELETE_ALLOWED = false;

     }

   
     this.CAN_ADD = false;
   let result = await this._dbService.getAllSuppliername(1).toPromise();
  // console.log("result:", result);
   this.suppliernameDataArr = result["results"];
   this.filteredTableDataArr = this.suppliernameDataArr;
   this.supplierDetailcount = result["count"];
 
 }
async ngOnInit() {
 
 await this.init();
 await this.populateFields();}

 
 
onClickEdit(obj) {
 this._router.navigate(['inventory/suppliers',obj.supplier_id]);
}



   
 async  onClickDelete(obj) {
   if(confirm("Are you sure to delete "+obj.supplier_name)) {
     await this._dbService.deleteSuppliername(obj).toPromise();
    // console.log("Implement delete functionality here");
     await this.init();
   }
 }
 

 
 

 	
 filterData() {
  this.filter = {
    from: new Date(this.model.fromDate).getTime(),
    to: new Date(this.model.toDate).getTime() + 86400000,
  };
  if (this.model.fromDate == '' || this.model.toDate == '') 
  {
    this.toast.error('Please select both dates.', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right',
    });
  } 

  else if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
    this.toast.error('To Date must be greater than From Date.', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right',
    });
  }

  else {
    this.filteredTableDataArr = [];
    this.supplierDetailcount = 1;
    this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from,this.filter.to,1).subscribe((response:any)=>{
      this.filteredTableDataArr = response.data.totalSuppliers;
      this.supplierDetailcount = response.data.totalSuppliersCount
      
    })
    // let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
    // let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
    // for (let i = 0; i < this.suppliernameDataArr.length; i++) {
    //   var dt: any = this.datepipe.transform(this.suppliernameDataArr[i].created_time, 'yyyy-MM-dd');
    //   if (dt >= from && dt <= to) {
        
    //    /*  this.toast.error('From Date must be <= To Date.', '', {
    //       timeOut: 2000,
    //       positionClass: 'toast-top-right',
    //     }); */
    //     this.filteredTableDataArr.push(this.suppliernameDataArr[i]);
    //   }
     
    // }
  }
}

 searchData(type){
  this.supplierDetailcount = 1;
  if(type == 'clear'&& !this.supplier_name)this.ngOnInit();

  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.supplier_name,'suppliers').subscribe((x: any)=>
   {
    this.filteredTableDataArr =x.data;
    this.supplierDetailcount =  x.data.length;
   }
 
   );
  }
  //  if(this.supplier_name == ""){
  //  this.ngOnInit();
  //  }
  //  else{
  //    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
  //      {
  //      return res.supplier_name.toLocaleLowerCase().match(this.supplier_name.toLocaleLowerCase());
  //    });
  //  }
  //  }
   key: string = 'id'
   reverse :boolean =true;
   sort(key){
     this.key = key;
     this.reverse = !this.reverse;
   }


   
  async downloadPdf() {
    let result = await this._dbService.getAllSuppliers().toPromise();
     this.suppliernameDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Supplierlist.pdf";
    if (this.flagShowProductReport) {
      fileName = "Supplierlist.pdf";
      //data = document.getElementById('content2');
      const col = [  "Supplier Name","Supplier Email" ,"Supplier Phone" ,"Supplier Address",]
      const rows = [];

      for (let k = 0; k < this.suppliernameDataArr.length; k++) {
        var temp = [ this.suppliernameDataArr[k].supplier_name,
        this.suppliernameDataArr[k].supplier_email, this.suppliernameDataArr[k].supplier_phone,
        this.suppliernameDataArr[k].supplier_address,

        ];
        rows.push(temp);
      }

      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Supplier List", data.settings.margin.left, 50);
      };

      doc.autoTable(col, rows, {
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
  downloadFile(data, filename = 'data') {
    if (this.flagShowProductReport) {
      let csvData = this.ConvertToCSV(data, [ 
        'supplier_name',
        'supplier_email',
        'supplier_phone',
        'supplier_address',]);
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
    let result = await this._dbService.getAllSuppliers().toPromise();
     this.suppliernameDataArr = result["data"];
    this.downloadFile(this.suppliernameDataArr, 'Supplierlist');
    }

    
  async upload(event: Event){
    this.supplierErrorArray=[];
    //get the file target
    this.file = event.target as HTMLInputElement
    //get file variable
    let fileToUpload = this.file.files.item(0);
    let supplers:any = await this._dbService.getAllSuppliers().toPromise();
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
            if(supplers && supplers.data.find(x=>x.supplier_email == values[1])){
              this.supplierErrorArray.push(`Duplicate email ID ${values[1]} found in   `+"row "+i);
              document.getElementById("file")["value"]=null; 

            }
            else{
              if(values && lines[i]){
              //create obj based on csv values
              let obj = {
              
                supplier_name:values[0],
                supplier_email:values[1],
                supplier_phone:values[2],
                supplier_address:values[3],

                supplier_products_name:values[4],
                supplier_payment_terms:values[5],
                supplier_pricing:parseFloat(values[6]),
                supplier_id:Date.now() + i - 1,  
              
               created_time: Date.now(),
               modified_time: Date.now(),
               created_by: this._dbService.getCurrentUserDetail().email,
               updated_by:this._dbService.getCurrentUserDetail().email
              } as SuppliernameDetail;
              //push to array
              this.file_obj.push(obj);
            }
            }            
          }
        }

        //read file
        fr.readAsText(fileToUpload);
    }else{
      this.invalid_file = true;
    }
  }

save(event: Event){
  //add new data to array
  this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
  //calculate occurence
 

  //add deals to db
  this._dbService.addMultipleSupplier(this.file_obj).subscribe(async (val) => {
    let result = await this._dbService.getAllSuppliername(1).toPromise();
    // console.log("result:", result);
     this.suppliernameDataArr = result["results"];
     this.filteredTableDataArr = this.suppliernameDataArr;
     this.supplierDetailcount = result["count"];
    for(let i = 0; i < this.file_obj.length; i++){
      this.file_obj[i]._id = val.data[i];
    }
    //reset indicators
    this.file.value = '';
    this.invalid_file = true;
  });
  
}

pageChanged(data,event){
  // console.log(data,event);
  this._dbService.getAllSuppliername(event).subscribe((res:any) => {
    // console.log(res)

    this.suppliernameDataArr=res.results
    
    this.filteredTableDataArr = this.suppliernameDataArr;
  })

}

 }

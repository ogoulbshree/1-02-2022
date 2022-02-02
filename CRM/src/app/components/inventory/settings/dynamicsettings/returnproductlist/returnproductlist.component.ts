import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { StockDetails } from 'src/app/models/StockDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
const jsPDF = require('jspdf');
@Component({
  selector: 'app-returnproductlist',
  templateUrl: './returnproductlist.component.html',
  styleUrls: ['./returnproductlist.component.css']
})
export class ReturnproductlistComponent extends DynamicComponent implements OnInit {
  filter: { from: number; to: number; };

  
  
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector, public _uiservice: UiService,
    private datepipe: DatePipe,
    private toast: ToastrService,) 
    { 

    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_STOCK,injector) 
  }



  date;
  stockDataArr :ProductDetail[] = [];
  filteredTableDataArr: any;
  flagShowProductReport = true;
  @ViewChild('csv', {static: false}) modal; 
  invalid_file: boolean = true;
  file_obj: any[];
  file: HTMLInputElement;
  searchText;
  filterQuery = ""
  rowsOnPage = 5;
  fromDate;
    toDate;
  categoryDetail = [];
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

 
  model: any = {
    fromDate: "",
    toDate:""
   };
   code:any;
   
    p:number =1;
 
    stackDetailcount: number=0;

  
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
      {
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = true;
        this.ALL_DELETE_ALLOWED = false;
      }
      

   
      this.CAN_ADD = false;
    let result = await this._dbService.getAllReturnedProducts(1).toPromise();
   // console.log("result:", result);
    this.stockDataArr = result["results"];
    this.filteredTableDataArr = this.stockDataArr;
    this.stackDetailcount =result["count"];

  }
  /*  async htmlInit() {
     let result = await this._dbService.getAllCategory().toPromise();
     console.log("result:", result);
     this.categoryDetail = result["data"];
     this.filteredTableDataArr = this.categoryDetail;
   
   } */



  async ngOnInit() {
    await this.init();
    /*   await this.htmlInit(); */

    await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['inventory/settings/dynamicsettings/addproducts',obj.product_id]);
  }

 

  
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.code)) {
      await this._dbService.deleteProduct(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

  search(term: string) {
    let fieldName = "code";
    this.filteredTableDataArr = this.stockDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
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
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from,this.filter.to,1).subscribe((response:any)=>{
      
        this.filteredTableDataArr = response.data.totalReturnedProducts;
        this.stackDetailcount = response.data.totalReturnedProductCount
        
      })
      // let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      // let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      // for (let i = 0; i < this.stockDataArr.length; i++) {
      //   var dt: any = this.datepipe.transform(this.stockDataArr[i].created_time, 'yyyy-MM-dd');
      //   if (dt >= from && dt <= to) {
          
      //    /*  this.toast.error('From Date must be <= To Date.', '', {
      //       timeOut: 2000,
      //       positionClass: 'toast-top-right',
      //     }); */
      //     this.filteredTableDataArr.push(this.stockDataArr[i]);
      //   }
       
      // }
    }
  }

  async downloadPdf() {
    let result = await this._dbService.getAllProductsList().toPromise();
    this.stockDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Stocklist.pdf";
    if (this.flagShowProductReport) {
      fileName = "Stocklist.pdf";
      //data = document.getElementById('content2');
      const col = [ "Code","Weight", "Manage Stock","Stock Status","stock"]
       
      const rows = [];

      for (let k = 0; k < this.stockDataArr.length; k++) {
        var temp = [ this.stockDataArr[k].code,
       this.stockDataArr[k].weight,this.stockDataArr[k].manage_stock, this.stockDataArr[k].stock_status,  this.stockDataArr[k].stock, 

        ];
        rows.push(temp);
      }

      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Stock List", data.settings.margin.left, 50);
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
      let csvData = this.ConvertToCSV(data, ['code', 'weight','stock']);
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
    let result = await this._dbService.getAllProductsList().toPromise();
    this.stockDataArr = result["data"];
    this.downloadFile(this.stockDataArr, 'Stocklist');
    }
  

  exportToPrint()  
  {  
    var data = document.getElementById('contentToConvert');  
   
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
               
                code :values[0],
                weight:values[1],
                manage_stock:values[2],
                stock_status:values[3],
                stock:values[4],
               stock_id: Date.now() + i - 1,
               created_time: Date.now(),
               modified_time: Date.now(),
               created_by: this._dbService.getCurrentUserDetail().email,
               updated_by:this._dbService.getCurrentUserDetail().email
              } as StockDetails;
              //push to array
              this.file_obj.push(obj);
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
  this._dbService.addMultipleProduct(this.file_obj).subscribe((val) => {

    for(let i = 0; i < this.file_obj.length; i++){
      this.file_obj[i]._id = val.data[i];
    }
    //reset indicators
    this.file.value = '';
    this.invalid_file = true;
  });
  
}





searchData(type){
 
 
  if(type == 'clear'&& !this.code)this.ngOnInit();

  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.code,'stockInReturn').subscribe((x: any)=>
   {this.filteredTableDataArr =x.data;
    this.stackDetailcount = x.data.length
  });
  
  }
  pageChanged(data,event){
    console.log(data,event);
    this._dbService.getAllProducts(event).subscribe((res:any) => {
      console.log(res)

      this.stockDataArr=res.results
      
      this.filteredTableDataArr = this.stockDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  }
  
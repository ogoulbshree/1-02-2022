
import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';

require('jspdf-autotable');
import html2canvas from 'html2canvas';
import { DBService } from 'src/app/services/dbservice.service';
import { DatePipe, formatDate } from '@angular/common';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent extends DynamicComponent implements OnInit {

  
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector, public _uiservice: UiService,
    private datepipe: DatePipe,
    private toast: ToastrService,) 
    { 

    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_PRODUCT,injector) 
  }




  productDataArr :ProductDetail[] = [];
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
  date;
 
  model: any = {
    fromDate: "",
    toDate:""
   };
   product_name :any;
   
    p:number =1;
 
    productDetailsCount: number = 0;
  
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
    let result = await this._dbService.getAllProducts(1).toPromise();
   // console.log("result:", result);
    this.productDataArr = result["results"];
    this.filteredTableDataArr = this.productDataArr;
    this.productDetailsCount =result["count"];

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
    this._router.navigate(['inventory/products', obj.product_id]);
  }

 

  
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.product_name)) {
      await this._dbService.deleteProduct(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

  search(term: string) {
    let fieldName = "product_name";
    this.filteredTableDataArr = this.productDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
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
      for (let i = 0; i < this.productDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.productDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.productDataArr[i]);
        }
       
      }
    }
  }

  async downloadPdf() {
    let result = await this._dbService.getAllProductsList().toPromise();
    this.productDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Productlist.pdf";
    if (this.flagShowProductReport) {
      fileName = "Productlist.pdf";
      //data = document.getElementById('content2');
      const col = [ "Product Name", "Cost price", "Supplier Name","Category name"];
      const rows = [];

      for (let k = 0; k < this.productDataArr.length; k++) {
        var temp = [ this.productDataArr[k].product_name,
        this.productDataArr[k].cost, this.productDataArr[k].supplier_name,this.productDataArr[k].category_name

        ];
        rows.push(temp);
      }

      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Product List", data.settings.margin.left, 50);
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
      let csvData = this.ConvertToCSV(data, ['product_name', 'cost', 'supplier_name', 'category_name']);
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

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv(){
    let result = await this._dbService.getAllProductsList().toPromise();
    this.productDataArr = result["data"];
    this.downloadFile(this.productDataArr, 'Productlist');
    }
  

  exportToPrint()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0; 
     
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Productlist.pdf'); // Generated PDF   
    });  
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
                  product_name:values[0],
                  cost: parseFloat(values[1]),               
                supplier_name:values[2],
               category_name:values[3],
               product_id: Date.now() + i - 1,
               created_time: Date.now(),
               modified_time: Date.now(),
               created_by: this._dbService.getCurrentUserDetail().email,
               updated_by:this._dbService.getCurrentUserDetail().email
              } as ProductDetail;
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

save(){
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





searchData(data){
 
 
  if(this.product_name == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.product_name.toLocaleLowerCase().match(this.product_name.toLocaleLowerCase());
    });
  }
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllProducts(event).subscribe((res:any) => {
      // console.log(res)

      this.productDataArr=res.results
      
      this.filteredTableDataArr = this.productDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  }
  
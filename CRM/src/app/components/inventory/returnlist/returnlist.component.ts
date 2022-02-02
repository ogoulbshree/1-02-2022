
import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { ReturnDetail } from 'src/app/models/ReturnDetail.model';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import html2canvas from 'html2canvas';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { DBService } from 'src/app/services/dbservice.service';
require('jspdf-autotable');

@Component({
  selector: 'app-returnlist',
  templateUrl: './returnlist.component.html',
  styleUrls: ['./returnlist.component.css']
})
export class ReturnlistComponent extends DynamicComponent implements OnInit {
  filter: { from: number; to: number; };
  invoiceReturnedCount: number=0;
  invoiceAmount: number=0;
  purchaseReturnedCount:number=0;
  purchaseAmount:number=0;
  productErrorName = [];
  wareHouseError = [];
  customerArr: ObjectDetail[]=[];
  supplierErrorName= [];
  customerErrorName= [];
  myInvoices: any;
  myPurchases: any;
  constructor( public _dbService:DBService,private _router: Router,injector: Injector, public _uiservice: UiService,
    private toast: ToastrService,private datepipe: DatePipe) { 

      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_RETURN,injector) 
    }

  searchText;
  date;
  filterQuery = ""
  rowsOnPage = 5;
  returnDataArr: ReturnDetail[] = [];
  filteredTableDataArr: any;
  flagShowQuotationReport = true;
  fromDate;
    toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  supplierArr: SuppliernameDetail[] = [];

  productDetail : ProductDetail[] =[]
 
  supplier_name :any;
   
  p:number =1;
  productDataArr : ProductDetail[] =[]
  
    model= {
      fromDate: "",
      toDate:""
     };
	 
	 
     returnDetailcount: number=0;
     invalid_file: boolean = true;
     file_obj: any[];
     file: HTMLInputElement;
     productItem=new Array<any>();
  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
      
      {
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = true;
        this.ALL_DELETE_ALLOWED = false;
    }

 
      this.CAN_ADD = false;
      this._dbService.getAllProductsList().subscribe(res =>{
        if(res)
        this. productDataArr= res["data"];
      });
      this._dbService.getAllSuppliers().subscribe(res =>{
        if(res)
        this. supplierArr= res["data"];
      });
      this._dbService.getAllCustomers().subscribe(res =>{
        if(res)
        this. customerArr= res["data"];
      });
    let result = await this._dbService.getAllReturns(1).toPromise();
  //  console.log("result:", result);
    this.returnDataArr = result["results"];
    this.filteredTableDataArr = this.returnDataArr;
    this.returnDetailcount = result["count"];
    this.getTotalItems(result["results"])
  }

  getTotalItems(data){
    this.invoiceReturnedCount = 0;
    this.invoiceAmount =  0;
    this.purchaseReturnedCount = 0;
    this.purchaseAmount =0
   data.map((item,index) =>{
     if(item.return_type == "customer"){
       this.invoiceReturnedCount = this.invoiceReturnedCount+ 1;
       this.invoiceAmount =  this.invoiceAmount +item.product_name.reduce((n, {product_Total}) => n + product_Total, 0)
     }
     else{
      this.purchaseReturnedCount = this.purchaseReturnedCount + 1;
      this.purchaseAmount =  this.purchaseAmount +item.product_name.reduce((n, {product_Total}) => n + product_Total, 0)
     }
   })
  }
  

  getProductDetailsCSV(productArr) {
    let names = '[{"cost":';
    let arr= ["cost","product_Total", "product_name","discount","quantity"]
    for (let k = 0; k < productArr.length; k++) {
       
      names +=  ''+ productArr[k].cost + ';'+
      '"product_Total":'+ productArr[k].product_Total + ';'+
      '"product_name":"'+ productArr[k].product_name+ '";'+
     '"discount":'+ productArr[k].discount+ ';'+
     '"quantity":'+ productArr[k].quantity
      // if(k<(productArr.length - 1)) names += ";";
    }
    return names + "}]";
  }

  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names +=  productArr[k].product_name;
      if(k<(productArr.length - 1)) names += ",";
    }
    return names + "]";
  }

  async ngOnInit() {
    await this.init();
    await this.populateFields();
    
  }


  onClickEdit(obj) {
    this._router.navigate(['inventory/return',obj.return_id]);
  }

 

  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.supplier_name)) {
      await this._dbService.deleteReturns(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }


 /*  search(term: string) {
    let fieldName = "customer_name";
    this.filteredTableDataArr = this.quoteDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
 */
  
	
 

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
      this.returnDetailcount = 1;
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from,this.filter.to,1).subscribe((response:any)=>{
        this.filteredTableDataArr = response.data.totalReturns;
        this.returnDetailcount = response.data.totalReturnsCount
        this.getTotalItems(response.data.totalReturns);
        
      })
      // let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      // let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      // for (let i = 0; i < this.returnDataArr.length; i++) {
      //   var dt: any = this.datepipe.transform(this.returnDataArr[i].created_time, 'yyyy-MM-dd');
      //   var dt: any = this.datepipe.transform(this.productDetail[i].created_time, 'yyyy-MM-dd');
      //   var dt: any = this.datepipe.transform(this.supplierDetail[i].created_time, 'yyyy-MM-dd');
      //   if (dt >= from && dt <= to) {
          
      //    /*  this.toast.error('From Date must be <= To Date.', '', {
      //       timeOut: 2000,
      //       positionClass: 'toast-top-right',
      //     }); */
      //     this.filteredTableDataArr.push(this.returnDataArr[i]);
      //   }
       
      // }
    }
  }
  





  async downloadPdf() {
    let result = await this._dbService.getAllReturnList().toPromise();
    this.returnDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Returnlist.pdf";
    if (this.flagShowQuotationReport) {
      fileName = "Returnlist.pdf";
      const col = ["Supplier Name","Customer Name", "Mobile", "Purchases Date", "Product Name"];
      const rows = [];

      for (let k = 0; k < this.returnDataArr.length; k++) {
        var temp = [this.returnDataArr[k].supplier_id?this.returnDataArr[k].supplier_name:"",!this.returnDataArr[k].supplier_id?this.returnDataArr[k].supplier_name:"", this.returnDataArr[k].supplier_phone,
        this.returnDataArr[k].returns_date,this.getProductDetails(this.returnDataArr[k].product_name)

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        doc.text("Report for Purchaseslist List", data.settings.margin.left, 50);
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
  save(event: Event){
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence
    
    // console.log("I am this",this.file_obj);
    
    //add returns to db
    this._dbService.addMultipleReturns(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      this.ngOnInit();
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
  }
  downloadFile(data, filename = 'data') {
    if (this.flagShowQuotationReport) {
      let csvData = this.ConvertToCSV(data,["warehouse_name",'returns_date','supplier_name',  'product_name','customer_name', ]);
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
  // console.log(array,headerList);
  
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        // console.log("I am head",head);
        if(head == "customer_name" )
        array[i][head] = array[i].object_id&&this.customerArr.find(x=>x.object_id == array[i].object_id).first_name
        if(head == "supplier_name" )
        array[i][head] =  array[i].supplier_id&&this.supplierArr.find(x=>x.supplier_name == array[i].object_id).supplier_name
        if(head == "product_name")
        array[i][head] = this.getProductDetailsCSV(array[i][head])
        // console.log("I am  array[i][head]", array[i][head]);
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv() {
    let result = await this._dbService.getAllReturnList().toPromise();
    this.returnDataArr = result["data"];
    this.downloadFile(this.returnDataArr, 'Return list');
  }
  exportToPrint() {
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
      pdf.save('Returnlist.pdf'); // Generated PDF   
    });
  }
 
  
searchData(type){
  this.returnDetailcount = 1;
 
  if(type == 'clear'&& !this.supplier_name)
  this.ngOnInit();
  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.supplier_name,'return').subscribe((x: any)=>
   {
     this.filteredTableDataArr =x.data;
     this.returnDetailcount =  x.data.length;
     this.getTotalItems(x.data);
    });
  
  }
  
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllReturns(event).subscribe((res:any) => {
      // console.log(res)

      this.returnDataArr=res.results
      
      this.filteredTableDataArr = this.returnDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
   replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
  toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
  closeUpload(){
    
    document.getElementById("file")["value"]=null;  
  }
   async fetchInvoices(id){
  
    return  this._dbService.fetchInvoices(id).toPromise()
    
    
    
  }
  async fetchPurchases(id){
    return this._dbService.fetchPurchases(id).toPromise()
  }
  async upload(event: Event){
    this.productErrorName=[];
    this.customerErrorName=[];
    this.wareHouseError=[];
    this.supplierErrorName=[];
    // this.supplierErrorName=[]
    let suppliers:any  = await this._dbService.getAllSuppliers().toPromise();
    let warehouses:any = await this._dbService.getAllWareHouses().toPromise();
    let customers:any = await this._dbService.getAllCustomers().toPromise();
    // console.log("suppliers",suppliers);
    
    //get the file target
    this.file = event.target as HTMLInputElement
    //get file variable
    let fileToUpload = this.file.files.item(0);
    
    //check if file is csv
    if(fileToUpload.name.includes('.csv')){
      
      this.invalid_file = false;
      let fr = new FileReader();
      //read file callbacak
      fr.onload =  async (e) => {
        //results
        let res = fr.result as string;
        //split on new line
        let lines = res.split('\n');
        this.file_obj = [];

        // console.log("I am lines",);
      
        
          for(let i = 1; i < lines.length; i++){
            //split on comma
            let values = lines[i].split(',');
            // console.log("I am values",values);
           
              let result = this.replaceAll(this.replaceAll(this.replaceAll(this.replaceAll(values[3],  ";",","),'""','"'),'"[','['),']"',']')
              // console.log("I am result",JSON.parse(result.toString()));
              let finalItem = JSON.parse(result.toString());
              // console.log("this.productDetail",this.productItem);
              // if(suppliers && !suppliers.data.find(x=>x.supplier_name == values[0]))
              // {
              //   console.log("I am error",values[0]);
              //   document.getElementById("file")["value"]=null; 
              //   // this.supplierErrorName = values[0];
              //   this.supplierErrorName.push(values[0] + " does not exist in supplier table error found in "+"row "+i);
                
              // }
              // else{
              // }
              finalItem.map((item,index) => {
              let product:any = this.productDataArr.find(x=>x.product_name == item.product_name);
              // console.log("I am product",product);
              
              
              if(product){
                product.quantity =item.quantity;
                product.product_Total = item.quantity*item.cost;
                product.discount = item.discount
                this.productItem.push(product);
              }
              else{
                document.getElementById("file")["value"]=null; 
                this.productErrorName.push(item.product_name + "does not exist in product table error found in "+"row "+i);
                
                
              }
              })
              if(warehouses && !warehouses.data.find(x=>x.warehouse_name == values[0].replace("\r","")))
              {
                // console.log("I am error",values[0]);
                document.getElementById("file")["value"]=null; 
                // this.supplierNameErrorFlag = true;
                // this.supplierErrorName = values[0];
                this.wareHouseError.push(values[0] + " does not exist in warehouse table error found in "+"row "+i);
                
              }
              else{
                this.wareHouseError=[];
              }
              if(values[2]&&!this.supplierArr.find(x=>x.supplier_name == values[2].replace("\r","")))
              {
                // console.log("I am error",values[2].replace("\r",""));
                document.getElementById("file")["value"]=null; 
                // this.supplierErrorName = values[0];
                this.supplierErrorName.push(values[2] + " does not exist in supplier table error found in "+"row "+i);
                
              }
              // console.log("I am customer",this.customerArr,values[4].replace("\r","").toString());
              
              if(values[4].replace("\r","") && !this.customerArr.find(x=>x.first_name   == values[4].replace("\r","")))
              {
                // console.log("I am error",values[4].replace("\r",""));
                document.getElementById("file")["value"]=null; 
                // this.supplierNameErrorFlag = true;
                // this.supplierErrorName = values[0];
                this.customerErrorName.push(values[4] + " does not exist in customer table error found in "+"row "+i);
              }
                
               
                
              // })
              // console.log("I am product", this.purchaseItem);
             
              
              // product.quantity = finalItem[0].quantity;
              // product.product_Total = finalItem[0].quantity*finalItem[0].cost;
              // product.discount = finalItem[0].discount
              // this.purchaseItem.push(product);
              // console.log("I am product",product,finalItem,this.purchaseItem);
              let date = new Date( values[1]);
              // console.log(this.toJSONLocal(date));
              
              // this.purchaseItem.product_name = products.find(p => p.product_)
          
                 if(values && lines[i] && this.productErrorName.length<=0 && this.customerErrorName.length<=0 && this.supplierErrorName.length<=0){
                //create obj based on csv values
                let obj ;
                if(values[2]){
                   obj = {
                    product_name:this.productItem,
                    activity_type:"supplier",
                    warehouse_name:values[0].replace("\r",""),
                    supplier_id:this.supplierArr.find(x=>x.supplier_name == values[2]).supplier_id,
                    returns_date:this.toJSONLocal(date),
                    created_by: this._dbService.getCurrentUserDetail().email,
                    updated_by: this._dbService.getCurrentUserDetail().email,
                    modified_time: Date.now(),
                    created_time: Date.now(),
                    purchase_id:await this.fetchPurchases(this.supplierArr.find(x=>x.supplier_name == values[2]).supplier_id).then((x:any)=>{
                      return x.data[0].purchase_id;
                    }),
                    return_id:Date.now(),
                    __v: 0,
                  } ;
                  // console.log("I am here2",await this.fetchPurchases(this.supplierArr.find(x=>x.supplier_name == values[2]).supplier_id).then((x:any)=>{
                  //   return x.data[0].purchase_id;
                  // }));
                  this.file_obj.push(obj);
                }
                else{
                
                  let temp = this.fetchInvoices(this.customerArr.find(x=>x.first_name == values[4].replace("\r","")).object_id);
                   obj = {
                    product_name:this.productItem,
                    activity_type:"customer",
                    warehouse_name:values[0].replace("\r",""),
                    object_id:this.customerArr.find(x=>x.first_name == values[4].replace("\r","")).object_id,
                    returns_date:this.toJSONLocal(date),
                    created_by: this._dbService.getCurrentUserDetail().email,
                    updated_by: this._dbService.getCurrentUserDetail().email,
                    modified_time: Date.now(),
                    created_time: Date.now(),
                    invoice_id:  await this.fetchInvoices(this.customerArr.find(x=>x.first_name == values[4].replace("\r","")).object_id).then((x:any)=>{
                      return x.data[0].invoice_id;
                    }),
                    return_id:Date.now(),
                    __v: 0,
                  } ;
                  // console.log("I am here1",await this.fetchInvoices(this.customerArr.find(x=>x.first_name == values[4].replace("\r","")).object_id));
                  this.file_obj.push(obj);
                }
               
                
                //push to array
               
              }
             
              
              this.productItem=[];
              
            
            
          }
           
          
      
        }

        //read file
        fr.readAsText(fileToUpload);
    }else{
      this.invalid_file = true;
    }
  }
}


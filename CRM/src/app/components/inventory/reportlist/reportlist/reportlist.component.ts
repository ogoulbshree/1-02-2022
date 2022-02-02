import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Chart } from "node_modules/chart.js";
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
const moment = require('moment');
@Component({
  selector: 'app-reportlist',
  moduleId: module.id,
  templateUrl: 'reportlist.component.html',
  styleUrls: ['reportlist.component.css']
})
export class ReportlistComponent extends DynamicComponent implements OnInit {
  form: FormGroup;
  chartSearchCompleted: boolean;
  showTableFlag:boolean=false;
  selectedArr = [];
  selectedCount: number=0;
  productsPagiantion:number=1;
  customerPagination:number=1;
  supplierPagination:number=1;
  purchasePagination:number=1;
  returnPagination:number=1;
  invoicePagination:number=1;
  reverse: boolean = true;
  key: string = 'id';
  sectionArr = [{ "name": "Customers Table" }, { "name": "Suppliers Table" }, { "name": "Purchases Table" }, { "name": "Returns Table" },
   { "name": "Invoice Table" }, { "name": "Product Table" }]
  monthsArray = [{ "name": 'January', value: 1 }, { "name": 'February', value: 2 }, { "name": 'March', value: 3 }, { "name": 'April', value: 4 },
  { "name": 'May', value: 5 }, { "name": 'June', value: 6 }, { "name": 'july', value: 7 }, { "name": 'August', value: 8 }, { "name": 'September', value: 9 },
  { "name": 'October', value: 10 }, { "name": 'November', value: 11 }, { "name": 'December', value: 12 }];
  globalDataArray= []
  constructor(public _uiservice: UiService,private _router: Router,injector: Injector, private formBuilder: FormBuilder,) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_REPORTS, injector);
  }

  async ngOnInit() {
    await this.populateFields();
    this.form = this.formBuilder.group({
      chartType: ['', Validators.required],
      viewType: ['', Validators.required],
      sectionType: ['', Validators.required],
      monthSelected: [''],
      yearSelected: ['', Validators.required],

    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
  sortCustomers(data){}
  sort(data){}
  onChange(event){
    this.form.get('viewType').setValue("");
    this.form.get('yearSelected').setValue("");
    this.form.get('chartType').setValue("");
    this.chartSearchCompleted=false;
    this.showTableFlag = false;
    
   }
   getDaysFromMonth(month, year) {
    let daysArray = [];
    let days = new Date(year, month, 0).getDate();
    if (days)
      for (let k = 1; k <= days; k++)
        daysArray.push(k)
    // console.log(daysArray);

    return daysArray;

  }
  getSelectedArray() {

  }
  getIndex=(id) =>{
    let index=  this.globalDataArray.findIndex(x=>x === id);
    if(index >=0)
    return this.monthsArray.find(x=>x.value == index+1).name

  }
  getIndexMonthly=(id) =>{
    
    if(id){
      let index = this.globalDataArray.findIndex(x=>x == id)
      return index+1;
    }
     

  }
  getPercentage=(value)=> {
    // console.log("I am the percentage",this.globalDataArray,value);
    if(value){
      let sum = 0;
      this.globalDataArray.map((data) => {
        sum += data;
       });
       return (value*100 / sum).toFixed(2)+"%";
    }
   

  }
  pageChanged(data, event) {

    if (data == "customers")
    this._dbService.objgetAllCustomer(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "products")
    this._dbService.getAllProducts(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "suppliers")
    this._dbService.getAllSuppliername(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "purchase")
    this._dbService.getAllPurchases(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "return")
    this._dbService.getAllReturns(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "invoice")
    this._dbService.getAllInvoice(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })

  }
  onClickEdit(data, obj) {
   
    if (data == "customers")
     this._router.navigate(['/inventory/customers', obj.object_id]);
   else if (data == "products")
     this._router.navigate(['inventory/products', obj.product_id]);
   else if (data == "suppliers")
   this._router.navigate(['inventory/suppliers',obj.supplier_id]);

   else if (data == "purchases")
   this._router.navigate(['inventory/purchases',obj.purchase_id]);

   else if (data == "return")
   this._router.navigate(['inventory/return',obj.return_id]);
   else if (data == "invoice")
   this._router.navigate(['inventory/invoice',obj.invoice_id]);
 }
 async onClickDelete(data, obj) {
   
  if (data == "customers") {
     if (confirm("Are you sure to delete " + obj.first_name)) {
       await this._dbService.deleteCustomer(obj).toPromise();
       //console.log("Implement delete functionality here");
       await this.getChart();
     }
   }
   else if (data == "products") {
     if (confirm("Are you sure to delete " + obj.product_name)) {
       await this._dbService.deleteProduct(obj).toPromise();
       //console.log("Implement delete functionality here");
       await this.getChart();
     }
   }

   else if (data == "suppliers") {
     if(confirm("Are you sure to delete "+obj.supplier_name)) {
       await this._dbService.deleteSuppliername(obj).toPromise();
      // console.log("Implement delete functionality here");
       await this.getChart();
     }
   }

   else if (data == "purchases") {
     if(confirm("Are you sure to delete "+obj.supplier_name)) {
       await this._dbService.deletePurchases(obj).toPromise();
       //console.log("Implement delete functionality here");
       await this.getChart();
     }
   }

   else if (data == "return") {
     if(confirm("Are you sure to delete "+obj.supplier_name)) {
       await this._dbService.deleteReturns(obj).toPromise();
       //console.log("Implement delete functionality here");
       await this.getChart();
     }
   }

   else if (data == "invoice") {
     
     if(confirm("Are you sure to delete "+obj.first_name)) {
       await this._dbService.deleteInvoice(obj).toPromise();
       //console.log("Implement delete functionality here");
       await this.getChart();
     }
   }
 }
 getProductDetails(productArr) {
  let names = "[";
  for (let k = 0; k < productArr.length; k++) {
    names += productArr[k].product_name;
    if (k < (productArr.length - 1)) names += ",";
  }
  return names + "]";
}
  async getChart() {

    let selectedArr: any, myChart, dataArray = [];
    this.selectedArr=[];
    if (this.form.value.chartType == "table") {
      if (this.form.value.sectionType == "Customers Table")
      selectedArr = await this._dbService.objgetAllCustomer(1).toPromise();
    else if (this.form.value.sectionType == "Suppliers Table")
      selectedArr = await this._dbService.getAllSuppliername(1).toPromise();
    else if (this.form.value.sectionType == "Purchases Table")
      selectedArr = await this._dbService.getAllPurchases(1).toPromise();
    else if (this.form.value.sectionType == "Returns Table")
      selectedArr = await this._dbService.getAllReturns(1).toPromise();
    else if (this.form.value.sectionType == "Expense Table")
      selectedArr = await this._dbService.getAllExpense(1).toPromise();
    else if (this.form.value.sectionType == "Invoice Table")
      selectedArr = await this._dbService.getAllInvoice(1).toPromise();
    else if (this.form.value.sectionType == "Product Table")
      selectedArr = await this._dbService.getAllProducts(1).toPromise();
      this.showTableFlag = true;
      
      if (this.form.value.viewType == "Yearly") {
        this.selectedCount =  selectedArr.count
        if(selectedArr.results.length>0){
          selectedArr.results.map((x) => {
            let date = new Date(x.created_time);
            if (this.form.value.yearSelected == date.getFullYear())
              this.selectedArr.push(x)
          })
          
        }
       
      }
      else if (this.form.value.viewType == "Monthly") {
        this.selectedCount =  selectedArr.count
        selectedArr.results.map((x, index) => {
          let date = new Date(x.created_time);
          if (this.form.value.monthSelected == date.getMonth() + 1 && this.form.value.yearSelected == date.getFullYear())
            this.selectedArr.push(x)
        })
      }
    }
    else{
      
   
      if (this.form.value.sectionType == "Customers Table")
      selectedArr = await this._dbService.getAllCustomers().toPromise();
    else if (this.form.value.sectionType == "Suppliers Table")
      selectedArr = await this._dbService.getAllSuppliers().toPromise();
    else if (this.form.value.sectionType == "Purchases Table")
      selectedArr = await this._dbService.getAllPurchaseList().toPromise();
    else if (this.form.value.sectionType == "Returns Table")
      selectedArr = await this._dbService.getAllReturnList().toPromise();
    else if (this.form.value.sectionType == "Expense Table")
      selectedArr = await this._dbService.getAllExpenseList().toPromise();
    else if (this.form.value.sectionType == "Invoice Table")
      selectedArr = await this._dbService.getAllInvoiceList().toPromise();
    else if (this.form.value.sectionType == "Product Table")
      selectedArr = await this._dbService.getAllProductsList().toPromise();
      if (this.form.value.viewType == "Yearly") {

        selectedArr.data.map((x) => {
          let date = new Date(x.created_time);
          if(this.form.value.yearSelected == date.getFullYear()){
          if (dataArray[date.getMonth()]) {
            dataArray[date.getMonth()] = dataArray[date.getMonth()] + 1;
          }
          else {
            dataArray[date.getMonth()] = 1;
          }
        }
        })
      }
      else if (this.form.value.viewType == "Monthly") {
        selectedArr.data.map((x, index) => {
         
          let date = new Date(x.created_time);
          // console.log("I am date",date);
          if(this.form.value.monthSelected == date.getMonth()+1 && this.form.value.yearSelected == date.getFullYear()){
            if (dataArray[date.getDate() - 1]) {
              dataArray[date.getDate() - 1] = dataArray[date.getDate() - 1] + 1;
            }
            else {
              dataArray[date.getDate() - 1] = 1;
            }
          }
          
        })
  
      }
      document.getElementById("divChart").innerHTML = '&nbsp;';
      document.getElementById("divChart").innerHTML = '<canvas id="myChart" width="400" height="400" ></canvas>';
      this.chartSearchCompleted=true;
      this.showTableFlag = false;
      myChart = new Chart('myChart', {
        type: this.form.value.chartType,
        data: {
          labels: this.form.value.viewType == "Yearly" ? this.monthsArray.map(x => { return x.name }) : this.getDaysFromMonth(this.form.value.monthSelected, this.form.value.yearSelected),
          datasets: [{
            label: this.form.value.sectionType + " count",
            data: dataArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            responsive: true,
            plugins: {
            },
            datalabels: {
              formatter: (value, ctx) => {
               
                let dataArr = ctx.chart.data.datasets[0].data;
                this.globalDataArray = dataArr;
                 if(value){
                  let sum = 0;
                  // console.log();
                  
                  dataArr.map((data) => {
                    sum += data;
                });
                return (value*100 / sum).toFixed(2)+"%";
                 }
                
            },
          },
          }
        },
         plugins: [ChartDataLabels],
      })
    }
    
   
  }
}

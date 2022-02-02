import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { Chart } from "node_modules/chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { ToastData, ToastOptions } from 'ng2-toasty';
@Component({
  selector: 'app-reportlist',
  moduleId: module.id,
  templateUrl: 'reportlist.component.html',
  styleUrls: ['reportlist.component.css']
})
export class ReportlistComponent extends DynamicComponent implements OnInit {
  form: FormGroup;
  sectionArr = [{ "name": "Customers Table" }, { "name": "Leads Table" }, { "name": "Add Visits Table" }, { "name": "Schedule Visit Table" },
  { "name": "Deals Table" }, { "name": "Product Table" }, { "name": "Quotation Table" },]
  monthsArray = [{ "name": 'January', value: 1 }, { "name": 'February', value: 2 }, { "name": 'March', value: 3 }, { "name": 'April', value: 4 },
  { "name": 'May', value: 5 }, { "name": 'June', value: 6 }, { "name": 'july', value: 7 }, { "name": 'August', value: 8 }, { "name": 'September', value: 9 },
  { "name": 'October', value: 10 }, { "name": 'November', value: 11 }, { "name": 'December', value: 12 }];
  globalDataArray= []
  chartSearchCompleted: boolean;
  showTableFlag:boolean=false;
  displayValue:string;
  selectedArr = [];
  reportPagination:number=1;
  selectedCount: number=0;
  reverse: boolean = true;
  key: string = 'id';
  leadsPagination:number=1;
  totalLeadsCount:number= 0;
  customerPagination:number=1;
  dealsPagination:number=1;
  quotesPagiantion:number=1;
  page:number=1;
  productsPagiantion:number=1;
  totalAddVisitsCount: number=0;
  totalScheduleCount: number=0;
  totalDealsCount: number=0;
  totalQuotesCount: number=0;
  constructor(public _uiservice: UiService,private _router: Router, injector: Injector, private formBuilder: FormBuilder,) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_REPORTS, injector);
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
  getDaysFromMonth(month, year) {
    let daysArray = [];
    let days = new Date(year, month, 0).getDate();
    if (days)
      for (let k = 1; k <= days; k++)
        daysArray.push(k)
    // console.log(daysArray);

    return daysArray;

  }
  getIndex=(id) =>{
    let index=  this.globalDataArray.findIndex(x=>x === id);
    if(index >=0)
    return this.monthsArray.find(x=>x.value == index+1).name

  }
  getIndexMonthly=(id) =>{
    
    if(id){
      // console.log("id",id);
      let index = this.globalDataArray.findIndex(x=>x == id)
      return index+1;
    }
     

  }
  
  pageChanged(data, event) {
   if (data == "schedule")
      {
        this._dbService.getAllScheduleVisits(event).subscribe((res:any) => {
          this.selectedArr=res.results
        })
      }
      else if (data == "customers")
      {
        this._dbService.objgetAllCustomer(event).subscribe((res:any) => {
          this.selectedArr=res.results
        })
      }
      
    else if (data == "deals")
    {
      this._dbService.getAllDealsByPage(event).subscribe((res:any) => {
        this.selectedArr=res.results
      })
    }
    else if (data == "products")
    {
      this._dbService.getAllProductsByPage(event).subscribe((res:any) => {
        this.selectedArr=res.results
      })
    }
   

    else if (data == "leads")
    {
      this._dbService.getAllLeadsByPage(event).subscribe((res:any) => {
        this.selectedArr=res.results
      })
    }
    else if (data == "quotes")
    {
      this._dbService.getAllQuotesByPage(event).subscribe((res:any) => {
        this.selectedArr=res.results
      })
    }
    else if (data == "addVisit")
    {
      this._dbService.getAlladdVisitsByPage(event).subscribe((res:any) => {
        this.selectedArr=res.results
      })
    }
  }

  onClickEdit(data, obj) {
    if (data == "schedule")
      this._router.navigate(['/sales/shedulevisits', obj.schedule_visit_id]);
    else if (data == "customers")
      this._router.navigate(['/sales/addcustomer', obj.object_id]);
    else if (data == "deals")
      this._router.navigate(['/sales/salesdeals', obj.deal_id]);
    else if (data == "products")
      this._router.navigate(['sales/products/createproducts', obj.product_id]);
    else if (data == "users")
      this._router.navigate(['/sales/settings/adduser', obj.user_id]);

    else if (data == "leads")
      this._router.navigate(['/sales/leads', obj.object_id]);

    else if (data == "quotes")
      this._router.navigate(['sales/createquotation', obj.quote_id]);
    else if (data == "addVisit")
      this._router.navigate(['/sales/addvisits', obj.visit_id]);
  }

  async onClickDelete(data, obj) {
    if (data == "schedule") {
      if (confirm("Are you sure to delete this visit")) {
        this._dbService.deleteScheduleVisit({ schedule_visit_id: obj.schedule_visit_id }).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          // this.showAlert(res.message, type);
        });
        await this.getChart();
      }
    }
    else if (data == "customers") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }
    else if (data == "deals") {
      if (confirm("Are you sure to delete " + obj.deal_name)) {
        await this._dbService.deleteDeal(obj).toPromise();
        // console.log(" delete functionality ");
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

    else if (data == "users") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteUser(obj).toPromise();
        await this.getChart();
      }
    }

    else if (data == "leads") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        // console.log(" delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "quotes") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteQuote(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "addVisits") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        this._dbService.deleteVisit({ visit_id: obj.visit_id }).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          // this.showAlert(res.message, type);
        });

        await this.getChart();
      }
    }
  }
  onChange(event){
    this.form.get('viewType').setValue("");
    this.form.get('yearSelected').setValue("");
    this.form.get('chartType').setValue("");
    this.chartSearchCompleted=false;
    this.showTableFlag = false;
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
  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names += productArr[k].product_name;
      if (k < (productArr.length - 1)) names += ",";
    }
    return names + "]";
  }
  displayFn(value: any | string): string | undefined {
    if (Array.isArray(value)) {
      value.forEach((product, index) => {
        if (index === 0) {
          this.displayValue = product.product_name;
        } else {
          this.displayValue += ', ' + product.product_name;
        }
      });
    } else {
      this.displayValue = value;
    }
    return  this.displayValue;
  }
  async getChart() {

    let selectedArr: any, myChart, dataArray = [];
   this.globalDataArray= [];
   this.selectedArr = [];
   
    if (this.form.value.chartType == "table") {
      if (this.form.value.sectionType == "Customers Table")
      selectedArr = await this._dbService.objgetAllCustomer(1).toPromise();
    else if (this.form.value.sectionType == "Leads Table")
    selectedArr = await this._dbService.objgetAllLeads(1).toPromise();
    else if (this.form.value.sectionType == "Add Visits Table")
    selectedArr = await this._dbService.getAllVisits1(1).toPromise();
    else if (this.form.value.sectionType == "Schedule Visit Table")
      selectedArr = await this._dbService.getAllScheduleVisits(1).toPromise();
    else if (this.form.value.sectionType == "Deals Table")
    selectedArr =await this._dbService.getAllDeals(1).toPromise();
    else if (this.form.value.sectionType == "Product Table")
      selectedArr = await this._dbService.getAllProducts(1).toPromise()
    else if (this.form.value.sectionType == "Quotation Table")
      selectedArr = await this._dbService.getAllQuotes(1).toPromise();
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
    else if (this.form.value.sectionType == "Leads Table")
      selectedArr = await this._dbService.getAllLeads().toPromise();
    else if (this.form.value.sectionType == "Add Visits Table")
      selectedArr = await this._dbService.getAllVisits().toPromise();
    else if (this.form.value.sectionType == "Schedule Visit Table")
      selectedArr = await this._dbService.getAllScheduleVisitsList().toPromise();
    else if (this.form.value.sectionType == "Deals Table")
      selectedArr = await this._dbService.getAllDealList().toPromise();
    else if (this.form.value.sectionType == "Product Table")
      selectedArr = await this._dbService.getAllProductsList().toPromise();
    else if (this.form.value.sectionType == "Quotation Table")
      selectedArr = await this._dbService.getAllQuotesList().toPromise();
      this.showTableFlag = false;
      this.chartSearchCompleted = true;
      if (this.form.value.viewType == "Yearly") {
        selectedArr.data.map((x) => {
          let date = new Date(x.created_time);
          if (this.form.value.yearSelected == date.getFullYear()) {
            if (dataArray[date.getMonth()]) {
              dataArray[date.getMonth()] = dataArray[date.getMonth()] + 1;
              this.globalDataArray[date.getMonth()] = dataArray[date.getMonth()] + 1;
            }
            else {
              dataArray[date.getMonth()] = 1;
              this.globalDataArray[date.getMonth()] = 1;
            }
          }
        })
      }
      else if (this.form.value.viewType == "Monthly") {
        selectedArr.data.map((x, index) => {
          let date = new Date(x.created_time);
          if (this.form.value.monthSelected == date.getMonth() + 1 && this.form.value.yearSelected == date.getFullYear()) {
            if (dataArray[date.getDate() - 1]) {
              dataArray[date.getDate() - 1] = dataArray[date.getDate() - 1] + 1;
              this.globalDataArray[date.getDate() - 1] = this.globalDataArray[date.getDate() - 1] + 1;
            }
            else {
              dataArray[date.getDate() - 1] = 1;
              this.globalDataArray[date.getDate() - 1] = 1;
            }
          }
  
        })
  
      }
      document.getElementById("divChart").innerHTML = '&nbsp;';
      document.getElementById("divChart").innerHTML = '<canvas id="myChart" width="400" height="400" ></canvas>';
      this.chartSearchCompleted=true;
      if (this.form.value.chartType == "bar") {
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
  
            scales: {
  
              yAxes: [{
                display: true,
                stacked: true,
                ticks: {
                  min: 0, // minimum value
                }
              }]
            }
          }
        })
      }
      else {
        
        myChart = new Chart('myChart', {
          type: this.form.value.chartType,
          data: {
            labels: this.form.value.viewType == "Yearly" ? this.monthsArray.map(x => { return x.name }) : this.getDaysFromMonth(this.form.value.monthSelected, this.form.value.yearSelected),
            datasets: [{
              label: this.form.value.sectionType + "count",
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
}


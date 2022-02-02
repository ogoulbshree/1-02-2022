import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { Chart } from "node_modules/chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reportlist',
  moduleId: module.id,
  templateUrl: 'reportlist.component.html',
  styleUrls: ['reportlist.component.css']
})
export class ReportlistComponent extends DynamicComponent implements OnInit {
  form: FormGroup;
  chartSearchCompleted: boolean;
  sectionArr = [{ "name": "Contacts Table" }, { "name": "Leads Table" }, { "name": "Customers Table" }, { "name": "Campaign Table" }
  , { "name": "Activity Table" }]
  monthsArray = [{ "name": 'January', value: 1 }, { "name": 'February', value: 2 }, { "name": 'March', value: 3 }, { "name": 'April', value: 4 },
  { "name": 'May', value: 5 }, { "name": 'June', value: 6 }, { "name": 'july', value: 7 }, { "name": 'August', value: 8 }, { "name": 'September', value: 9 },
  { "name": 'October', value: 10 }, { "name": 'November', value: 11 }, { "name": 'December', value: 12 }];
  globalDataArray= []
  selectedCount: any;
  selectedArr=[];
  showTableFlag: boolean;
  contactsPagination:number=1;
  customerPagination:number=1;
  leadsPagination:number=1;
  campaignsPagination:number=1;
  activityPagination:number=1;
  reverse: boolean = true;
  key: string = 'id';
  constructor(public _uiservice: UiService,private _router: Router, injector: Injector, private formBuilder: FormBuilder,) {
    super(GlobalConstants.COMPONENT_NAME.MARKETING_REPORTS, injector);
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
  onClickEdit(data, obj) {
    if (data == "customers")
      this._router.navigate(['/marketing/addcustomer', obj.object_id]);
    else if (data == "users")
      this._router.navigate(['/marketing/settings/adduser', obj.user_id]);
    else if (data == "leads")
      this._router.navigate(['/marketing/leads', obj.object_id]);
    else if (data == "activity")
      this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
    else if (data == "campaigns")
      this._router.navigate(['/marketing/campaigns', obj.campaign_id]);
    else if (data == "contacts")
      this._router.navigate(['/marketing/addcontact', obj.object_id]);
  }
  async onClickDelete(data, obj) {

    if (data == "customers") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "users") {
      if (confirm("Are you sure to delete " + obj.usertype)) {
        await this._dbService.deleteUser(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "leads") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "activity") {
      if (confirm("Are you sure to delete " + obj.record_type)) {
        await this._dbService.deleteActivity(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "campaigns") {
      if (confirm("Are you sure to delete " + obj.campaign_owner)) {
        await this._dbService.deleteCampaign(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

    else if (data == "contacts") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.getChart();
      }
    }

  }
  pageChanged(data, event) {
    // if (data == "schedule")
    //   this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
    //     this.filteredScheduleVisits = res.data.totalschedulevisits
    //   })
    if (data == "customers")
    this._dbService.objgetAllCustomer(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "contacts")
    this._dbService.objgetAllContacts(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
    else if (data == "activity")
    this._dbService.getAllActivity(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })
   

    else if (data == "leads")
    this._dbService.objgetAllLeads(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })

    else if (data == "campaigns")
    this._dbService.getAllCampaign(event).subscribe((res:any) => {
      this.selectedArr=res.results
    })

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
  async getChart() {

    let selectedArr: any, myChart, dataArray = [];
    this.globalDataArray= [];
    this.selectedArr = [];
    if (this.form.value.chartType == "table") {
      if (this.form.value.sectionType == "Contacts Table")
      selectedArr =  await this._dbService.objgetAllContacts(1).toPromise();
    else if (this.form.value.sectionType == "Leads Table")
      selectedArr = await this._dbService.objgetAllLeads(1).toPromise();
    else if (this.form.value.sectionType == "Customers Table")
      selectedArr = await this._dbService.objgetAllCustomer(1).toPromise();
      else if (this.form.value.sectionType == "Campaign Table")
      selectedArr = await this._dbService.getAllCampaign(1).toPromise();
      else if (this.form.value.sectionType == "Activity Table")
      selectedArr = await this._dbService.getAllActivity(1).toPromise();
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
      if (this.form.value.sectionType == "Contacts Table")
      selectedArr = await this._dbService.getAllContacts().toPromise();
    else if (this.form.value.sectionType == "Leads Table")
      selectedArr = await this._dbService.getAllLeads().toPromise();
    else if (this.form.value.sectionType == "Customers Table")
      selectedArr = await this._dbService.getAllCustomers().toPromise();
      else if (this.form.value.sectionType == "Campaign Table")
      selectedArr = await this._dbService.getAllCampaignList().toPromise();
      else if (this.form.value.sectionType == "Activity Table")
      selectedArr = await this._dbService.getAllTicketing().toPromise();
    if (this.form.value.viewType == "Yearly") {

      selectedArr.data.map((x) => {
        let date = new Date(x.created_time);
        if(this.form.value.yearSelected == date.getFullYear()){
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
        // console.log("I am date",date);
        if(this.form.value.monthSelected == date.getMonth()+1 && this.form.value.yearSelected == date.getFullYear()){
          if (dataArray[date.getDate() - 1]) {
            dataArray[date.getDate() - 1] = dataArray[date.getDate() - 1] + 1;
            this.globalDataArray[date.getDate() - 1] = this.globalDataArray[date.getDate() - 1] + 1;
          }
          else {
            dataArray[date.getDate() - 1] = 1;
            this.globalDataArray[date.getDate() - 1] =1
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
               if(value){
                let sum = 0;
                
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


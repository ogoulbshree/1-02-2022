import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DBService } from 'src/app/services/dbservice.service';
import { OrganisationsComponent } from '../organisations/organisations.component';

@Component({
  selector: 'app-organisationlist',
  templateUrl: './organisationlist.component.html',
  styleUrls: ['./organisationlist.component.css']
})
export class OrganisationlistComponent implements OnInit {
  teamLead = [];
date;
  constructor(injector: Injector, public dialog: MatDialog, public _dbService: DBService) { }
  nodes: any = [];
  newObj;
  ngOnInit() {
    this.nodes = [];
    // console.log(this.nodes);
    let ceo, cto, temp;
    this._dbService.getAllEmployees().subscribe(employee => {


      if (employee) {
        employee["data"].map((x, index) => {
          // console.log(x);
          if (x.designation_weight == 0) {
            temp = {
              name: x.first_name,
              cssClass: 'ngx-org-ceo',
              image: '',
              assigned_to: x.assigned_to,
              employee_id: x.employee_id,
              title: x.designation,
              childs: []
            }
            this.nodes.push(temp);
          }
          else if (x.designation_weight == 1) {
            temp = {
              name: x.first_name,
              cssClass: 'ngx-org-ceo',
              image: '',
              assigned_to: x.assigned_to,
              employee_id: x.employee_id,
              title: x.designation,
              childs: []
            }
            this.nodes[0].childs.push(temp);
          }
          else if (x.designation_weight == 2) {
            temp = {
              name: x.first_name,
              cssClass: 'ngx-org-ceo',
              image: '',
              assigned_to: x.assigned_to,
              employee_id: x.employee_id,
              title: x.designation,
              childs: [],
              index1: 0,
              index2:0
            }
            // console.log(this.nodes[0].childs.find(y=>y.employee_id == x.assigned_to));
            let index= this.nodes[0].childs.findIndex(y=>y.employee_id == x.assigned_to);
            let i = this.nodes[0].childs.findIndex(x => x.title.toLowerCase().includes('cto'))
            temp.index1  = index;
            temp.index2 = this.nodes[0].childs[i].childs.length;
            this.nodes[0].childs[index].childs.push(temp);

          }
          else {
            temp = {
              name: x.first_name,
              cssClass: 'ngx-org-ceo',
              image: '',
              employee_id: x.employee_id,
              assigned_to: x.assigned_to,
              title: x.designation,
              childs: []
            }
            const res = this.findItemNested(this.nodes, x.assigned_to, "childs");
            // console.log(res);
            this.nodes[0].childs[res.index1].childs[res.index2].childs.push(temp);

            // if(res.){
            //  this.nodes.find(x=>)
            // }
            // let i = this.nodes.childs.findIndex(y=>y.employee_id == x.assigned_to)
            // this.nodes[0].childs[i].childs.push(temp);
          }
        })
      }
    })
  }
  findItemNested = (arr, itemId, nestingKey) => (
    arr.reduce((a, item) => {
      // console.log(itemId, item, a);

      if (a) return a;
      if ((item.employee_id) === Number(itemId)) return item;
      if (item[nestingKey]) return this.findItemNested(item[nestingKey], itemId, nestingKey)
    }, null)
  );
  onClickEdit(item, index) {
    
  }
  test(evt) {
    const dialogRef = this.dialog.open(OrganisationsComponent);
    dialogRef.componentInstance.employee_id = evt.employee_id;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
    //     var newObj= {   name: 'Yoonus',
    //     cssClass: 'ngx-org-ceo',
    //     image: 'assets/node.svg',
    //     title: 'CEO, Google Cloud',
    //   };
    //  console.log(this.nodes);
    //  this.nodes[0].childs.push(newObj);


  }

}

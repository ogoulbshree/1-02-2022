import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ExpenseDetail } from 'src/app/models/ExpenseDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { UiService } from 'src/app/services/ui.service';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent extends DynamicComponent implements OnInit {

  expenseDetail: ExpenseDetail;
  expenseItemDetail: ExpenseitemDetail[] = [];
  file 
  form: FormGroup;
  email:string;
  users;
  preview: string;
  users_keyword = "email";
  optionSelected = false;
  isUpdate = false;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(public _dbService:DBService, private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,@Inject(LOCALE_ID) 
  public locale: string, public _uiservice: UiService, public fb: FormBuilder) 
    {
      
        super(GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_EXPENSES,injector);
      
    this.form = this.fb.group({
      name: [''],
      files: [null]
    })
   
  
  
  
}


   
  async htmlInit() {
    let result = await this._dbService.getAllUsersForAdmin(GlobalConstants.CURRENT_MODULE).toPromise();
    this.users= result["data"];
    {let result = await this._dbService.getAllExpenseItem(1).toPromise();
    this.expenseItemDetail = result["results"];}
  


  }

  async ngOnInit() {
    this.htmlInit();
    await this.populateFields();
    this.expenseDetail = new ExpenseDetail();
   
    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let expense_id = params["id"];
        if (expense_id) {
          let result = await this._dbService.getExpense(expense_id).toPromise();
         // console.log(result);
          this.expenseDetail = result["data"];
          this.isUpdate = true;
          this.preview=this.expenseDetail.files;
        }

      }
    );

  }




  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save expenses...", this.expenseDetail);
    this.expenseDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
    this.expenseDetail.modified_time = Date.now();
	
    try {
      let result = null;
     // CustomLogger.logStringWithObject("FILES:", this.file);
      if (this.file != undefined || this.file != null) {
        const formData = new FormData();
        formData.append('file', this.file);
        result = await this._dbService.uploadFile(formData).toPromise();
        //CustomLogger.logStringWithObject("uploadFile:result:", result);

        let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
       // CustomLogger.logStringWithObject("files:", fileName);
        this.expenseDetail.files = fileName;
      }
      if (this.isUpdate)
        result = await this._dbService.updateExpense(this.expenseDetail).toPromise();
      else {
        this.expenseDetail.created_by= this._dbService.getCurrentUserDetail().email;
        this.expenseDetail.created_time = Date.now();
        let newaddexpenses = new ExpenseDetail();
        newaddexpenses.expense_id = this.expenseDetail.expense_id;
        newaddexpenses.date = this.expenseDetail.date;
        newaddexpenses.expense_item = this.expenseDetail.expense_item;
        newaddexpenses.amount = this.expenseDetail.amount;
        newaddexpenses.email = this.expenseDetail.email;
        newaddexpenses.user_id = this.expenseDetail.user_id;
        newaddexpenses.files = this.expenseDetail.files;
        newaddexpenses.created_by = this.expenseDetail.created_by;
        newaddexpenses.updated_by = this.expenseDetail.updated_by;
        newaddexpenses.created_time = this.expenseDetail.created_time;
        newaddexpenses.modified_time= this.expenseDetail.modified_time;
        result = await this._dbService.addExpense(newaddexpenses).toPromise();
      }
     // CustomLogger.logStringWithObject("addexpense:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Expenses Added Successfully");
      else
        CustomMisc.showAlert("Expenses Updated Successfully");
      this._router.navigate(["/inventory/expenselist"]);
      this.showError = "";

    }
    /* catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Expense: " + error.message, true);
    } */
    catch (error) { 
     
       this.showError = error.error.message;
     }  

  }


  onUsersSelect(users){
    /*  this.quoteDetail.phone = customer.phone; */
    this.expenseDetail = users;
      this.email = users.email;
      if(users.user_id)
      this.expenseDetail.user_id = users.user_id;
      this.optionSelected = true;
     
      
    }
    onChangeSearch(ev) {
      this.optionSelected = false;
   
    }
    onFocused(ev) {
   
    }

  selectImage(event){
    /* const file = (event.target as HTMLInputElement).files[0]; */
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    
    this.form.patchValue({files: file});
    this.form.get('files').updateValueAndValidity()
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
    }
    }
  onClickForm() {
    this.expenseDetail.amount = "";
    this.expenseDetail.date = "";
    this.expenseDetail.expense_id = "";
    this.expenseDetail.expense_item = "";
   
}
}

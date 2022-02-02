import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { MarketingUserDetail } from 'src/app/models/MarketingUserDetail.model';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { LoginService } from 'src/app/services/loginService.service';
import { UiService } from 'src/app/services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
 lang: string = "";
 clicked = false;

 PICKLIST_PREFERRED_LANGUAGE_ARRAY = GlobalConstants.ARRAY_PREFERRED_LANGUAGE;
 preferred_language = GlobalConstants.PREFERRED_LANGUAGE.ENGLISH;
 PICKLIST_USER_TYPES_ARRAY: any;
 userModel: any = {
  email: "",
  password:""
 };



  fieldTextType: boolean;
  constructor(private _dbService: DBService,
    private _router: Router,
    public _uiservice:UiService, 
    private toastyService: ToastyService,private _loginService: LoginService,private _globalService: GlobalService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1'); 
    this._dbService.switchDB('ogoul_main_db').subscribe(x=>{})
    localStorage.removeItem('userDetailSales');
    localStorage.removeItem('userDetailService');
    localStorage.removeItem('userDetailsMarketing');
    localStorage.removeItem('userDetailsInventory');
    localStorage.removeItem('userDetailsHrms'); 
  }
   
 /*  async login() {
    if (this.login && this.password) {
      let result = await this._dbService.getUserFromEmail(this.email).toPromise();
      if (result["data"] != null) {
        let marketingUserDetail: MarketingUserDetail = result["data"];
        this._dbService.setCurrentUserDetail(marketingUserDetail);
        this._dbService.getCurrentUserDetail().marketing_usertype
     
        this._loginService.updateAuthStatus(true);
      } else {
        CustomMisc.showAlert("Invalid Username/Password");
        return;
      }


      this._dbService.login({ email: this.email, password: this.password }).subscribe(res => {
        CustomLogger.logStringWithObject("loginsuccess:", res);
        CustomLogger.logStringWithObject("login Data:", res.data);
        if (res.data) {
          localStorage.clear();
          CustomLogger.logStringWithObject("login JWT:", localStorage.getItem('jwt'));
          localStorage.setItem('jwt', res.data);
          this._dbService.setToken(res.data);
          this._router.navigate(["sales/dashboard"]);
        } 
      else {
          let type = res.status == 200 ? 'success' : 'failed'
          CustomMisc.showAlert(res.message, );
        }
      });
    } else {
      alert("Enter email and password");
    }
   
  }
  

   
  toggleFieldTextType()
  {
   this.fieldTextType = !this.fieldTextType;
 }
}
 */




async login() {
  this.clicked = true;

  this._dbService.switchDBToOrg(this.userModel.email).subscribe(async (data:any) =>  {
    if(data.data){
      // console.log(this.userModel);
      
      if (this.userModel.password) {
        let result = await this._dbService.getUserFromEmail(this.userModel.email).toPromise();
        // console.log(result["data"]);
        if (result["data"] != null) {
          let userDetail: UserDetail = result["data"];
          // console.log(result["data"]);
          
          this._dbService.setCurrentUserDetail(userDetail);
          // console.log('login',this._dbService.getCurrentUserDetail());
         // this._dbService.getCurrentUserDetail().usertype
        
          this._loginService.updateAuthStatus(true);
        } 
        let userType = this._dbService.getCurrentUserDetail().usertype;
        // console.log('login',userType);
        this._dbService.login({ email: this.userModel.email, password: this.userModel.password }).subscribe(res => {
          if (res.data) {
            localStorage.clear();
            localStorage.setItem('jwt', res.data);
            this._dbService.setToken(res.data);
            if(userType == "Sales User" || userType == "Sales Manager" || userType ==  "Sales Admin" || userType ==  "Super Manager"|| userType ==  "Super Admin"|| userType ==  "Super Sales" ){
              GlobalConstants.CURRENT_DASHBOARD = "sales";
              this._router.navigate(["sales/dashboard"]);
              this.clicked=false
            }         
              
          else if(userType == "Service Admin" || userType == "Service Manager" || userType ==  "Service User"){
            GlobalConstants.CURRENT_DASHBOARD = "service";
            this._router.navigate(["service/dashboard"]);
            this.clicked=false
          }
         else if(userType == "Marketing Admin" || userType == "Marketing Manager" || userType ==  "Marketing User"){
           GlobalConstants.CURRENT_DASHBOARD = "marketing";
          this._router.navigate(["marketing/marketingdashboard"]);
          this.clicked=false
    
         }
         else if(userType == "Inventory Admin" || userType == "Inventory Manager" || userType ==  "Inventory User"){
          GlobalConstants.CURRENT_DASHBOARD = "inventory";
         this._router.navigate(["inventory/dashboard"]);
         this.clicked=false
    
        }

        else if(userType == "Inventory Admin" || userType == "Inventory Manager" || userType ==  "Inventory User" ||userType == "Marketing Admin" || userType == "Marketing Manager" || userType ==  "Marketing User"||
        userType == "Service Admin" || userType == "Service Manager" || userType ==  "Service User" || userType == "Sales User" || userType == "Sales Manager" || userType ==  "Sales Admin" || userType ==  "Super Manager"|| userType ==  "Super Admin"|| userType ==  "Super Sales" 
       || userType == "Hr Admin" || userType == "Hr Manager" || userType ==  "Hr User")
        {
          GlobalConstants.CURRENT_DASHBOARD = "hrms";
         this._router.navigate(["hrms/dashboard"]);
         this.clicked=false
    
        }

    
          else if(userType == "Ogoul User" || userType == "Super Ogoul Admin" || userType ==  "Super Ogoul Manager" || userType== "Super Ogoul Sales" || userType == "Super Ogoul Service")  {
          this._router.navigate(["ogoul/dashboard"]);
          this.clicked=false
    

          } 


          
          else if(userType ==  "Super Manager"|| userType ==  "Super Admin"|| userType ==  "Super Sales" )  {
            this._router.navigate(["helpdesk/dashboard"]);
            this.clicked=false
      
  
            } 
        
          else {
            CustomMisc.showAlert("Invalid Username/Password");
            this.clicked=false
            return;
          }
        }
        
        });
      }
      this.showAlert("Message", "success");
    }
    else{
      // console.log("data is ",data);
      
    }
  })
 
}

myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
async onLanguageSelect(ev) {
  //console.log("ev.target;;;;;;;", ev.target);
  //console.log("ev.target.value;;;;;;;", ev.target.value);
 
  GlobalConstants.CURRENT_SELECTED_LANGUAGE = ev.target.value;
  this.myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
 /*  this.translate.use(ev.target.value); */
  this._uiservice.langDataSource.next(ev.target.value);
 

}

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
      //console.log('Toast ' + toast.id + ' has been removed!');
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
toggleFieldTextType()
{
 this.fieldTextType = !this.fieldTextType;
}


}

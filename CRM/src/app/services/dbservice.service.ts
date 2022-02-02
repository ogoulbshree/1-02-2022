import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ContactDetail } from '../models/ContactDetail.model';
import { CustomerDetail } from '../models/CustomerDetail.model';
import { LeadDetail } from '../models/LeadDetail.model';
import { UserDetail } from '../models/UserDetail.model';
import { CampaignDetail } from '../models/CampaignDetail.model';
import { ActivityDetail } from '../models/ActivityDetail.model';
import { throwError } from 'rxjs/internal/observable/throwError';
import { QuoteDetail } from '../models/QuoteDetail.model';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PipelineDetail} from '../models/PipelineDetail.model'
import { ObjectDetail } from '../models/ObjectDetail.model';
import { CategoryDetail } from '../models/CategoryDetail.model';
import { ProductDetail } from '../models/ProductDetail.model';
import { DealDetail } from '../models/DealDetail.model';
import { CaseDetail } from '../models/CaseDetail.model';  
import { FaqDetail } from '../models/FaqDetail.model';
import{SalesstageDetail} from '../models/SalesStageDetail.model'
import{LeadsourceDetail} from '../models/LeadsourceDetail.model'
import { ContactusDetail } from '../models/ContactusDetail.model';
import{RequesteddemoDetail} from '../models/Requesteddemo.model'
import { TicketDetail } from "../models/Ticketing.model";
import { FieldDetail } from "../models/utils/FieldDetail.model";
import { LandingPage } from "../models/utils/Landingpage.model";
import { DepartmentDetail } from "../models/DepartmentDetail.model";
import { SourceDetail } from "../models/SourceDetail.model";
import { ActiveDetails } from "../models/ActiveDetails.model";
import { CampaigntypeDetail } from "../models/CampaigntypeDetail.model";
import { CampaignstatusDetail } from "../models/CampaignstatusDetail.model";
import { ExpenseitemDetail } from "../models/ExpenseitemDetail";
import { ExpenseDetail } from "../models/ExpenseDetail.model";
import { environment } from "src/environments/environment";
import { StatusDetail } from "../models/StatusDetail.model";
import { SurveysDetail } from "../models/SurveysDetail.model";
import { SalesstatusDetail } from "../models/Salesstatus.model";
import { Serviceticketing } from "../models/Serviceticketing.model";
import { EscalationDetail } from "../models/EscalationDetail.model";
import { SuppliernameDetail } from "../models/SuppliernameDetail.model";
import { ShedulevisitsDetail } from "../models/ShedulevisitsDetail.model";
import { CurrencyDetail } from "../models/CurrencyDetails.model";
import { PurchaseDetail } from "../models/PurchaseDetail.model";
import { InvoiceDetails } from "../models/InvoiceDetails.model";
import { StockDetails } from "../models/StockDetails.model";
import { WarehouseDetail } from "../models/WarehouseDetail.model";
import { ReturnDetail } from "../models/ReturnDetail.model";
import {OgoulTicketDetail} from "../models/Ogoulticketing.model"
import { EmployeeDetail } from "../models/EmployeeDetail.model";
import { DesignationDetail } from "../models/DesignationDetails.model";
import { HolidayDetail } from "../models/HolidayDetail.model";
import { LeaveDetail } from "../models/LeaveDetail.model";
import { NoticetabDetail } from "../models/NoticeTabDetails.model";
import { TrainingDetail } from "../models/TrainingDetail.model";
import { TravelDetail } from "../models/TravelDetails.model";
import { CandidateDetail } from "../models/CandidateDetails.model";
import { EmployeestatusDetail } from "../models/EmployeestatusDetails.model";
import { PolicyDetails } from "../models/PolicyDetails.model";
import { ProjectDetail } from "../models/ProjectDetails.model";
import { AttendanceDetail } from "../models/AttendanceDetails.model";
import { LeaveTypeDetail } from "../models/LeaveTypeDetail.model";
import { PayRollDetail } from "../models/PayRollDetails.model";
import { TaskDetail } from "../models/TaskDetail.model";
import { OrganisationInfoDetail } from "../models/OrganisationInfoDetail.model";
import { PlansDetail } from "../models/PlansDetail.model";


@Injectable()
export class DBService {
    baseUrl = environment.SERVER_URL;
  
url = 'https://translation.googleapis.com/language/translate/v2?key=';

translate(obj: DBService, key: string) {
    //console.log("Google OBJ:::", obj);
    return this._http.post(this.url + key, obj);
  }

SERVER_URL = "http://localhost:3000/api";
  /*   SERVER_URL = "http://172.23.0.30:3000/api"; */
    constructor(private _http: HttpClient) {
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
   


    getMyOptions(){
        const  headers = ({
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
            
            // 'Authorization': 'Bearer ' + this.getToken()
        });
        return headers;
    }
    
   
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    
    login(user): Observable<any> {
        return this._http
            .post<any>(this.SERVER_URL + '/login', user, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getAllUserlogin() {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllUserlogin', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }



    addUser(obj: UserDetail) {
        let headers = this.getMyOptions();
        //console.log("Inside addUser");
        return this._http.post(this.SERVER_URL + '/addUser', obj,{headers});
    } 
    updateUser(obj: UserDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateUser', obj,{headers});
    }
    getUser(user_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getUser/' + user_id,{headers});
    }
    deleteUser(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteUser', obj,{headers});
    }
     getAllUsers() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllUsers',{headers})
     }
     

 /* getAllUsersForAdmin(moduleType,page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getUsersForAdminByPage?page='+page+'&limit=5',{headers});

        
     } 

     
getAllUsersByPage(moduleType,page){
    let headers = this.getMyOptions();
    console.log(this.SERVER_URL + '/getUsersForAdminByPage')
    return this._http.get(this.SERVER_URL + '/getUsersForAdminByPage/'+moduleType,page,{headers});
} */
     
getAllUsersForAdmin(moduleType) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllUsersForAdmin/' + moduleType,{headers}) 
 }
getTotalUsers(){
        return this._http.get(this.SERVER_URL + '/getTotalUsers');
    }

    ///Marketing user details
    
   /*  addMarketinguser(obj: MarketingUserDetail) {
        console.log("Inside addMarketinguser");
        return this._http.post(this.SERVER_URL + '/addMarketinguser', obj);
    } updateMarketinguser(obj: MarketingUserDetail) {
        return this._http.post(this.SERVER_URL + '/updateMarketinguser', obj);
    }getMarketinguser(marketing_user_id){
        return this._http.get(this.SERVER_URL + '/getMarketinguser/' + marketing_user_id);
    }deleteMarketinguser(obj){
        return this._http.post(this.SERVER_URL + '/deleteMarketinguser', obj);
    } getAllMaketingusers() {
        return this._http.get(this.SERVER_URL + '/getAllMaketingusers');}
getTotalMarketingusers(){
        return this._http.get(this.SERVER_URL + '/getTotalMarketingusers');
    } */
////////contacts
addContacts(obj: ObjectDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addContacts");
    return this._http.post(this.SERVER_URL + '/addContacts', obj,{headers});
}
updateContact(obj: ObjectDetail, convertItLead) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateContact/' + convertItLead, obj,{headers});
}


getContact(object_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getContact/' + object_id,{headers});
}
deleteContact(obj){
    
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteContact', obj,{headers});
}

getAllContacts(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/objgetAllContacts',{headers});
}

//file


//////Leads ////////

updateLead(obj: ObjectDetail, convertIt) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateLead/' + convertIt, obj,{headers});
}



addLeads(obj: LeadDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addLeads");
    var formData: any = new FormData();
    return this._http.post(this.SERVER_URL + '/addLeads', obj,formData);
}
updateLeads(obj: LeadDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateLeads', obj,{headers});
}
getLeads(lead_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getLeads/' + lead_id,{headers});
}
deleteLeads(obj){

    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteLeads', obj,{headers});
}

getAllLeads(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/objgetAllLeads',{headers});
}

getAllActivitiesOfParent(object_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllActivitiesOfParent/' + object_id,{headers});
}




////////customer


addCustomer(obj: ObjectDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addcustomer");
    return this._http.post(this.SERVER_URL + '/addcustomer', obj,{headers});
}
updateCustomer(obj: ObjectDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCustomer', obj,{headers});
}
getCustomer(object_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCustomer/' + object_id,{headers});
}
 deleteCustomer(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCustomer', obj,{headers});
}
 
uploadFile(formData: FormData) {
    return this._http.post(this.SERVER_URL + '/uploadFile', formData);
}



objgetAllCustomer(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getcustomerByPage?page='+page+'&limit=5',{headers});
}
getAllCustomers(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/objgetAllCustomer',{headers});
}



objgetAllContacts(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getContactsByPage?page='+page+'&limit=5', {headers});
}


objgetAllLeads(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getleadsByPage?page='+page+'&limit=5',{headers});
}



/* 
uploadCsv(formData: FormData) {
    return this._http.post(this.SERVER_URL + '/uploadCsv', formData);
}
 */

//////////campaigns

addCampaign(obj: CampaignDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaign");
    return this._http.post(this.SERVER_URL + '/addCampaign', obj,{headers});
}
updateCampaign(obj: CampaignDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCampaign', obj,{headers});
}
getCampaign(campaign_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaign/' + campaign_id,{headers});
}
deleteCampaign(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCampaign', obj,{headers});
}

getAllCampaign(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaignByPage?page='+page+'&limit=5', {headers})
}
getAllCampaignList(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCampaign', {headers})

}

///activity


addActivity(obj: ActivityDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addActivity");
    return this._http.post(this.SERVER_URL + '/addActivity', obj,{headers});
}
updateActivity(obj: ActivityDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateActivity', obj,{headers});
}
getActivity(activity_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getActivity/' + activity_id,{headers});
}
deleteActivity(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteActivity', obj,{headers});
}

getAllActivity(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getActivityByPage?page='+page+'&limit=5', {headers})}
getObjectActivities(activity_type){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getObjectActivities/' +activity_type,{headers});
}

getAllActivityList(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllActivity', {headers})}

getSpecificObjectActivities(object_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSpecificObjectActivities/' +object_id,{headers});
}

/* getSpecificActivities(campaign_id)
{
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSpecificActivities/'+campaign_id,{headers});

} */


////Dashboard count
  

dashboardSearch() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/dashboardSearch', {headers});
}

getUserFromEmail(email) {
    
    return this._http.get(this.SERVER_URL + '/getUserFromEmail/' + email);
}

logout(user) {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/logout', user, {headers})
        .pipe(
            catchError(this.handleError)
        )
}

getTotalProducts() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getTotalProducts',{headers});
}



deleteCategory(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCategory', obj,{headers});
}
getAllCategory(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCategoryByPage?page='+page+'&limit=5', {headers});
}
getAllCategories(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCategory', {headers});
}
getCategory(category_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCategory/' + category_id,{headers});
}
updateCategory(obj: CategoryDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCategory', obj,{headers});
}
addCategory(obj: CategoryDetail) {
    let headers = this.getMyOptions();
  //  console.log("Inside addCategory");
    return this._http.post(this.SERVER_URL + '/addCategory', obj,{headers});
}


deletePipeline(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deletePipeline', obj,{headers});
}
getAllPipeline(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPipelineByPage?page='+page+'&limit=5', {headers});
}
getAllPipelines() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllPipeline', {headers});
}
getPipeline(pipeline_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPipeline/' + pipeline_id,{headers});
}
updatePipeline(obj: PipelineDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updatePipeline', obj,{headers});
}
addPipeline(obj: PipelineDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addCategory");
    return this._http.post(this.SERVER_URL + '/addPipeline', obj,{headers});
}
////// dynamic pages 
addPlans(obj: PlansDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addSource");
    return this._http.post(this.SERVER_URL + '/addPlans', obj,{headers});
} updatePlans(obj: PlansDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updatePlans', obj,{headers});
}getPlans(plan_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSource/' + plan_id,{headers});
}deletePlans(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deletePlans', obj,{headers});
} 
getAllPlans(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPlansByPage?page='+page+'&limit=5', {headers})
}






addQuote(obj: QuoteDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addQuote");
    return this._http.post(this.SERVER_URL + '/addQuote', obj,{headers});
}

updateQuote(obj: QuoteDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateQuote', obj,{headers});
}


getQuote(quote_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getQuote/' + quote_id,{headers});
}

deleteQuote(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteQuote', obj,{headers});
}

getAllQuotes(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getQuotesByPage?page='+page+'&limit=5', {headers})
}

getAllQuotesList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllQuotes', {headers})
}

addMultipleQuotes(obj: QuoteDetail[]): Observable<any> {
let headers = this.getMyOptions();
return this._http.post(this.SERVER_URL + '/addMultipleQuotes', obj,{headers});
}


///leadsorce



addLeadsource(obj: LeadsourceDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addLeadsource");
    return this._http.post(this.SERVER_URL + '/addLeadsource', obj,{headers});
}

updateLeadsource(obj: LeadsourceDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateLeadsource', obj,{headers});
}


getLeadsource(lead_source_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getLeadsource/' + lead_source_id,{headers});
}

deleteLeadsource(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteLeadsource', obj,{headers});
}

getAllLeadsource(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getLeadsourceByPage?page='+page+'&limit=5', {headers});
}
getAllLeadSources() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllLeadsource', {headers});
}








addsalesStatus(obj:SalesstatusDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addStatus");
    return this._http.post(this.SERVER_URL + '/addsalesStatus', obj,{headers});
}

updatesalesStatus(obj: SalesstatusDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updatesalesStatus', obj,{headers});
}


getsalesStatus(status_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getsalesStatus/' + status_id,{headers});
}

deletesalesStatus(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deletesalesStatus', obj,{headers});
}

getAllsalesStatus() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllsalesStatus',{headers});
}

addStatus(obj: StatusDetail) {
    let headers = this.getMyOptions();
//    console.log("Inside addStatus");
    return this._http.post(this.SERVER_URL + '/addStatus', obj,{headers});
}

updateStatus(obj: StatusDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateStatus', obj,{headers});
}


getStatus(status_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getStatus/' + status_id,{headers});
}

deleteStatus(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteStatus', obj,{headers});
}

getAllStatus() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllStatus',{headers});
}






addSurvey(obj: SurveysDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addSurvey");
    return this._http.post(this.SERVER_URL + '/addSurvey', obj,{headers});
}

updateSurvey(obj: SurveysDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateSurvey', obj,{headers});
}


getSurvey(survey_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSurvey/' + survey_id,{headers});
}

deleteSurvey(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteSurvey', obj,{headers});
}

getAllSurvey() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllSurvey',{headers});
}







//////sales stage


addSalesstage(obj: SalesstageDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addSalesstage");
    return this._http.post(this.SERVER_URL + '/addSalesstage', obj,{headers});
}

updateSalesstage(obj: SalesstageDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateSalesstage', obj,{headers});
}


getSalesstage(quote_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSalesstage/' + quote_id,{headers});
}

deleteSalesstage(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteSalesstage', obj,{headers});
}
getAllSalesstage(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL +  '/getSalesstageByPage?page='+page+'&limit=5', {headers});
}
getAllSalesStages() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL +  '/getAllSalesstage', {headers});
}
///deals

addDeal(obj: DealDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addDeal");
    return this._http.post(this.SERVER_URL + '/addDeal', obj,{headers});
}

updateDeal(obj: DealDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateDeal', obj,{headers});
}
 
/* updateDeal(deal_id) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateDeal/' + deal_id,{headers});
} */


getDeals(deal_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDeals/' + deal_id,{headers});
}

deleteDeal(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteDeal', obj,{headers});
}

getAllDeals(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDealsByPage?page='+page+'&limit=5', {headers})
}
getAllDealList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllDeals', {headers})
}


///product

//requested demo



addDemodetails(obj: RequesteddemoDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addDeal");
    return this._http.post(this.SERVER_URL + '/addDemodetails', obj,{headers});
}

updateDemodetails(obj: RequesteddemoDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateDemodetails', obj,{headers});
}


getDemodetails(Requested_demo_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDemodetails/' + Requested_demo_id,{headers});
}

deleteDemodetails(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteDemodetails', obj,{headers});
}

getAllDemodetails() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllDemodetails',{headers});
}


addProduct(obj: ProductDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addProduct");
    return this._http.post(this.SERVER_URL + '/addProduct', obj,{headers});
}

updateProduct(obj: ProductDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateProduct', obj,{headers});
}


getProduct(product_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getProduct/' + product_id,{headers});
}

deleteProduct(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteProduct', obj,{headers});
}

getAllProducts(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getProductsByPage?page='+page+'&limit=5', {headers})
}

getAllReturnedProducts(page){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getReturnedProductsByPage?page='+page+'&limit=5', {headers})  
}

getAllProductsList(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllProducts', {headers})
}




///cases



addCases(obj: CaseDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCases");
    return this._http.post(this.SERVER_URL + '/addCases', obj,{headers});
}

updateCases(obj: CaseDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCases', obj,{headers});
}


getCases(case_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCases/' + case_id,{headers});
}

deleteCases(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCases', obj,{headers});
}

getAllCases() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCases',{headers});
}
////Faq



addFaqs(obj: FaqDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addFaqs");
    return this._http.post(this.SERVER_URL + '/addFaqs', obj,{headers});
}

updateFaqs(obj: FaqDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateFaqs', obj,{headers});
}


getFaqs(faq_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getFaqs/' + faq_id,{headers});
}

deleteFaqs(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteFaqs', obj,{headers});
}

getAllFaqs(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getFaqByPage?page='+page+'&limit=5', {headers})
}
getAllFaq() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllFaqs', {headers})
}
searchQuestions(string){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + `/searchQuestions/${string}`, {headers})
}




addContactus(obj: ContactusDetail) {
    let headers = this.getMyOptions();
   // console.log("Inside addContactus");
    return this._http.post(this.SERVER_URL + '/addContactus', obj,{headers});
} updateContactus(obj: ContactusDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateContactus', obj,{headers});
}getContactus(contact_us_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getContactus/' + contact_us_id,{headers});
}deleteContactus(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteContactus', obj,{headers});
} getAllContactus() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllContactus',{headers})}




    addTicketing(obj: TicketDetail) {
        let headers = this.getMyOptions();
       // console.log("Inside addTicketing");
        return this._http.post(this.SERVER_URL + '/addTicketing', obj,{headers});
    } updateTicketing(obj: TicketDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateTicketing', obj,{headers});
    }getTicketing(ticket_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTicketing/' + ticket_id,{headers});
    }deleteTicketing(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteTicketing', obj,{headers});
    } 
    getAllTicketing() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllTicketing',{headers})
    }





  /*   addEscalation(obj: EscalationDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addEscalation");
        return this._http.post(this.SERVER_URL + '/addEscalation', obj,{headers});
    }  */

    addEscalation(obj){
        return this._http.post(this.SERVER_URL + '/addEscalation', obj)
      }
    updateEscalation(obj: EscalationDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateEscalation', obj,{headers});
    }getEscalation(escalation_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getEscalation/' + escalation_id,{headers});
    }deleteEscalation(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteEscalation', obj,{headers});
    } 
    getAllEscalation() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllEscalation',{headers})
    }



    

    addserviceTicketing(obj: Serviceticketing) {
        let headers = this.getMyOptions();
       // console.log("Inside addserviceTicketing");
        return this._http.post(this.SERVER_URL + '/addserviceTicketing', obj,{headers});
    } updateserviceTicketing(obj: Serviceticketing) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateserviceTicketing', obj,{headers});
    }getserviceTicketing(ticket_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getserviceTicketing/' + ticket_id,{headers});
    }deleteserviceTicketing(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteserviceTicketing', obj,{headers});
    } 
    getAllserviceTicketing(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getServiceTicketingByPage?page='+page+'&limit=5', {headers})
    }


///dynamic pages 

    //fields
    getFieldDetailsForComponent(component_name) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getFieldDetailsForComponent/' + component_name,{headers});
        
    }


    getlandingpageForComponent(component_name){
   
        return this._http.get(this.SERVER_URL + '/getlandingpageForComponent/' + component_name);
    

    }
    updateFieldDetail(fieldDetail: FieldDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateFieldDetail/', fieldDetail,{headers});
    }


    updateLandingpage(landingpage: LandingPage) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateLandingpage/', landingpage,{headers});
    }

    
////// dynamic pages 
addSource(obj: SourceDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addSource");
    return this._http.post(this.SERVER_URL + '/addSource', obj,{headers});
} updateSource(obj: SourceDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateSource', obj,{headers});
}getSource(source_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSource/' + source_id,{headers});
}deleteSource(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteSource', obj,{headers});
} 
getAllSource(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSourceByPage?page='+page+'&limit=5', {headers})
}



addWarehouse(obj: WarehouseDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addWarehouse");
    return this._http.post(this.SERVER_URL + '/addWarehouse', obj,{headers});
} updateWarehouse(obj: WarehouseDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateWarehouse', obj,{headers});
}getWarehouse(warehouse_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getWarehouse/' + warehouse_id,{headers});
}deleteWarehouse(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteWarehouse', obj,{headers});
} 
getAllWarehouse(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getWarehouseByPage?page='+page+'&limit=5', {headers});
}
getAllWareHouses(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllWarehouse', {headers});
}


addDepartment(obj: DepartmentDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addDepartment");
    return this._http.post(this.SERVER_URL + '/addDepartment', obj,{headers});
} updateDepartment(obj: DepartmentDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateDepartment', obj,{headers});
}getDepartment(department_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDepartment/' + department_id,{headers});
}deleteDepartment(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteDepartment', obj,{headers});
} 
getAllDepartment(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDepartmentByPage?page='+page+'&limit=5', {headers});
}

//Organisation Info START
addOrganisationInfo(obj: OrganisationInfoDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addDepartment");
    return this._http.post(this.SERVER_URL + '/addOrganisationInfo', obj,{headers});
} updateOrganisationInfo(obj: OrganisationInfoDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateOrganisationInfo', obj,{headers});
}getOrganisationInfo(department_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getOrganisationInfo/' + department_id,{headers});
}deleteOrganisationInfo(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteOrganisationInfo', obj,{headers});
} 
getAllOrganisationInfo(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getOrganisationInfoByPage?page='+page+'&limit=5', {headers});
}
//Organisation Info END





addCampaignstatus(obj: CampaignstatusDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignstatus");
    return this._http.post(this.SERVER_URL + '/addCampaignstatus', obj,{headers});
} updateCampaignstatus(obj: CampaignstatusDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCampaignstatus', obj,{headers});
}getCampaignstatus(campaign_status_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaignstatus/' + campaign_status_id,{headers});
}deleteCampaignstatus(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCampaignstatus', obj,{headers});
} 
getAllCampaignstatus() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCampaignstatus',{headers})
}



addCampaigntype(obj: CampaigntypeDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaigntype");
    return this._http.post(this.SERVER_URL + '/addCampaigntype', obj,{headers});
} updateCampaigntype(obj: CampaigntypeDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCampaigntype', obj,{headers});
}getCampaigntype(campaign_type_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaigntype/' + campaign_type_id,{headers});
}deleteCampaigntype(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCampaigntype', obj,{headers});
} 
getAllCampaigntype(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaigntypeByPage?page='+page+'&limit=5', {headers});
}



addCampaignactive(obj: ActiveDetails) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addCampaignactive', obj,{headers});
} updateCampaignactive(obj: ActiveDetails) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCampaignactive', obj,{headers});
}getCampaignactive(active_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaignactive/' + active_id,{headers});
}deleteCampaignactive(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCampaignactive', obj,{headers});
} 
getAllCampaignactive(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCampaignctiveByPage?page='+page+'&limit=5', {headers});
}

getAllCampaignActiveList(){
    
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCampaignactive', {headers});
}



getUsersByUserType(usertype): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/getUsersByUserType', usertype, {headers})
        .pipe(
            catchError(this.handleError)
        )
}
getAllExpenseForEmail() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllExpenseForEmail', {headers});
}
addExpense(obj: ExpenseDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addExpense ");
    return this._http.post(this.SERVER_URL + '/addExpense', obj, {headers});
}
updateExpense(obj: ExpenseDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateExpense', obj, {headers});
}
getAllExpense(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getExpensesByPage?page='+page+'&limit=5', {headers})
}
getAllExpenseList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllExpense', {headers})
}
getExpense(expense_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getExpense/' + expense_id, {headers});
}
getTotalExpenses() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getTotalExpenses', {headers});
}
addExpenseItem(obj: ExpenseitemDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addExpenseItem ");
    return this._http.post(this.SERVER_URL + '/addExpenseItem', obj, {headers});
}
updateExpenseItem(obj: ExpenseitemDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateExpenseItem', obj, {headers});
}

deleteExpenseItem(obj) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteExpenseItem', obj, {headers});
}
getAllExpenseItem(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getExpenseItemByPage?page='+page+'&limit=5', {headers});
}
getExpenseItem(item_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getExpenseItem/' + item_id, {headers});
}
 deleteExpense(obj): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/deleteExpense', obj, {headers})
            .pipe(
                catchError(this.handleError)
            )
    } 
getUidsAndEmail(){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getUidsAndEmail' , {headers});        
}
getVisitsOfSalesUser() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + "/getVisitsOfSalesUser", {headers});
}



getAllVisits1(page) {
    let headers = this.getMyOptions();
    return this._http .get<any>(this.SERVER_URL + '/getaddVisitsByPage?page='+page+'&limit=5', {headers})
        .pipe(
            catchError(this.handleError)
        )
}
getAllVisits(){
    let headers = this.getMyOptions();
    return this._http .get<any>(this.SERVER_URL + '/getAllVisits1', {headers})
        .pipe(
            catchError(this.handleError)
        )
}
getVisit(visit_id): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .get<any>(this.SERVER_URL + '/getVisit/' + visit_id, {headers})
        .pipe(
            catchError(this.handleError)
        )
}
getVisitsBetweenDate(dates): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/getVisitsBetweenDates', dates, {headers})
        .pipe(
            catchError(this.handleError)
        )
}
/* addVisit(visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/addVisit', visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
} */

addVisit(visit) {
    let headers = this.getMyOptions();
   /*  console.log("Inside scheduleVisit"); */
    return this._http.post(this.SERVER_URL + '/addVisit', visit, {headers});
} 
/* updateVisit(visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/updateVisit', visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
} */


updateVisit(visit) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateVisit', visit, {headers});
} 

deleteVisit(visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/deleteVisit', visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
}


/* scheduleVisit(visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/scheduleVisit', visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
} */

 scheduleVisit(scheduleVisit) {
    let headers = this.getMyOptions();
   /*  console.log("Inside scheduleVisit"); */
    return this._http.post(this.SERVER_URL + '/scheduleVisit', scheduleVisit, {headers});
} 


// getAllScheduleVisits() {
//     let headers = this.getMyOptions();
//     return this._http
//         .get<any>(this.SERVER_URL + '/getAllScheduleVisits', {headers})
//         .pipe(
//             catchError(this.handleError)
//         )
// }
getAllScheduleVisits(page) {
    let headers = this.getMyOptions();
    return this._http
        .get<any>(this.SERVER_URL + '/getScheduledVisitsByPage?page='+page+'&limit=5', {headers})
        .pipe(
            catchError(this.handleError)
        )
}
getScheduleVisit(schedule_visit_id): Observable<any> {
    let headers = this.getMyOptions();return this._http.get<any>(this.SERVER_URL + '/getScheduleVisit/' + schedule_visit_id, {headers})
        .pipe(
            catchError(this.handleError)
        )
} 
getAllScheduleVisitsList(){
    let headers = this.getMyOptions();
    return this._http
        .get<any>(this.SERVER_URL + '/getAllScheduleVisits', {headers})
        .pipe(
            catchError(this.handleError)
        )
}

/*  getScheduleVisit(schedule_visit_id) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getScheduleVisit/' + schedule_visit_id, {headers});
} */
/* updateScheduleVisit(schedule_visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http.post<any>(this.SERVER_URL + '/updateScheduleVisit', schedule_visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
} */ 


updateScheduleVisit(scheduleVisit) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateScheduleVisit', scheduleVisit, {headers});
} 



deleteScheduleVisit(schedule_visit): Observable<any> {
    let headers = this.getMyOptions();
    return this._http
        .post<any>(this.SERVER_URL + '/deleteScheduleVisit', schedule_visit, {headers})
        .pipe(
            catchError(this.handleError)
        )
}


/////uploadcsv

uploadcsv(data){
    return this._http.post(this.SERVER_URL + '/uploadcsv', data);
  }

  addMultipleDeal(obj: DealDetail[]): Observable<any> {
    let headers = this.getMyOptions();
   // console.log("Inside add Multiple Deals");
    //console.log(this.SERVER_URL + '/addMultipleDeal');
    return this._http.post(this.SERVER_URL + '/addMultipleDeal', obj,{headers});
  }



  addMultipleCustomer(obj: ObjectDetail[]): Observable<any> {
    let headers = this.getMyOptions();
   // console.log("Inside add Multiple Customer");
    //console.log(this.SERVER_URL + '/addMultipleCustomer');
    return this._http.post(this.SERVER_URL + '/addMultipleCustomer', obj,{headers});
  }
  
  addMultipleUser(obj: UserDetail[]): Observable<any> {
    let headers = this.getMyOptions();
    //console.log("Inside add Multiple User");
    //console.log(this.SERVER_URL + '/addMultipleUser');
    return this._http.post(this.SERVER_URL + '/addMultipleUser', obj,{headers});
  }

  

  addMultipleCampiagn(obj: CampaignDetail[]): Observable<any> {
    let headers = this.getMyOptions();
    //console.log("Inside add Multiple Campiagn");
    //console.log(this.SERVER_URL + '/addMultipleCampiagn');
    return this._http.post(this.SERVER_URL + '/addMultipleCampiagn', obj,{headers});
  }

  addMultipleFaq(obj: FaqDetail[]): Observable<any> {
    let headers = this.getMyOptions();
  //  console.log("Inside add Multiple FaqDetail");
    //console.log(this.SERVER_URL + '/addMultipleFaq');
    return this._http.post(this.SERVER_URL + '/addMultipleFaq', obj,{headers});
  }

  addMultipleProduct(obj: ProductDetail[]): Observable<any> {
    let headers = this.getMyOptions();
  //  console.log("Inside add Multiple ProductDetail");
    //console.log(this.SERVER_URL + '/addMultipleProduct');
    return this._http.post(this.SERVER_URL + '/addMultipleProduct', obj,{headers});
  }
  addMultipleSupplier(obj: SuppliernameDetail[]): Observable<any> {
    let headers = this.getMyOptions();
  //  console.log("Inside add Multiple ProductDetail");
    //console.log(this.SERVER_URL + '/addMultipleProduct');
    return this._http.post(this.SERVER_URL + '/addMultipleSupplier', obj,{headers});
  }
  

  addMultipleTicketing(obj: Serviceticketing[]): Observable<any> {
    let headers = this.getMyOptions();
    //console.log("Inside add Multiple Serviceticketing");
    //console.log(this.SERVER_URL + '/addMultipleTicketing');
    return this._http.post(this.SERVER_URL + '/addMultipleTicketing', obj,{headers});
  }

 


  //upload file
  uploadNotes(file: File){
    let formData:FormData = new FormData();
    formData.append('uploadNotes', file, file.name);
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    let options = { headers: headers };
    return this._http.post(this.SERVER_URL + '/upload', formData, options)
}

downloadFile(file_path: string){

    return this._http.get<Blob>(this.SERVER_URL + '/upload', 
    {params: {file_path: file_path}, observe: 'response', responseType: 'blob' as 'json'});
  }


 

/* 
  download(file:String){
    var body = {filename:file};
console.log("file",body)
    return this._http.post('http://localhost:3000/api/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}

 */


download(obj){
    return this._http.get(this.SERVER_URL + '/download',{params: {id: obj._id, path: obj.path}});
  }

addNotes(obj){
    return this._http.post(this.SERVER_URL + '/notes', obj)
  }



  deleteNotes(obj){
    return this._http.delete(this.SERVER_URL + '/notes', {params: {id: obj._id, file_path: obj.file_path}})
  }


  getNotes(object_id){
    return this._http.get(this.SERVER_URL + '/notes', {params: {object_id: object_id}});
  }


  getEsclation(ticket_id){
    return this._http.get(this.SERVER_URL + '/getEscalation', {params: {ticket_id: ticket_id}});
  }


  getCampaignnotes(campaign_id){
    return this._http.get(this.SERVER_URL + '/notes', {params: {campaign_id: campaign_id}});
  }

  
  getAllnotes() {
  
    return this._http.get(this.SERVER_URL + "/getAllnotes");
}
 ////Calendar example 


  
 get_events(): Observable<any>
 {
   return this._http.get(this.SERVER_URL + '/get_events');
 }

 set_event(event){
   let options = {
     headers: {
       'Content-Type': 'application/json'
     }
   }
   return this._http.post(this.SERVER_URL + '/set_event', event);
 }

 put_event(changed_event, id){
   let options = {
     headers: {
       'Content-Type': 'application/json'
     },
     params: {
       _id: id,
     }
   }
//    console.log(options);
   return this._http.put(this.SERVER_URL + '/put_event', changed_event, options);
 }

 delete_event(id){
   let options = {
     params: {
       _id: id,
     }
   }
//    console.log(options);
   return this._http.delete(this.SERVER_URL +'/events', options);
 }



 addSuppliername(obj: SuppliernameDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addSuppliername', obj,{headers});
} updateSuppliername(obj: SuppliernameDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateSuppliername', obj,{headers});
}getSuppliername(supplier_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSuppliername/' + supplier_id,{headers});
}deleteSuppliername(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteSuppliername', obj,{headers});
} 
getAllSuppliername(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getSuppliernameByPage?page='+page+'&limit=5', {headers});
}
getAllSuppliers() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllSuppliername', {headers});
}









addCurrency(obj: CurrencyDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addCurrency', obj,{headers});
} updateCurrency(obj: CurrencyDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateCurrency', obj,{headers});
}getCurrency(currency_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCurrency/' + currency_id,{headers});
}deleteCurrency(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteCurrency', obj,{headers});
} 
getAllCurrency(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getCurrencyByPage?page='+page+'&limit=5', {headers});
} 
getAllCurrencies() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllCurrency', {headers});
} 


addPurchases(obj: PurchaseDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addPurchases', obj,{headers});
} updatePurchases(obj: PurchaseDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updatePurchases', obj,{headers});
}getPurchases(purchase_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPurchases/' + purchase_id,{headers});
}deletePurchases(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deletePurchases', obj,{headers});
} 
getAllPurchases(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPurchaseByPage?page='+page+'&limit=5', {headers});
} 
getAllPurchaseList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllPurchases', {headers});
} 

addMultiplePurchase(obj: PurchaseDetail[]): Observable<any> {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/addMultiplePurchase', obj,{headers});
  }



addReturns(obj: ReturnDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addReturns', obj,{headers});
} updateReturns(obj: ReturnDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateReturns', obj,{headers});
}getReturns(return_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getReturns/' + return_id,{headers});
}deleteReturns(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteReturns', obj,{headers});
} 
getAllReturns(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getReturnsByPage?page='+page+'&limit=5', {headers});
} 

getAllReturnList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllReturns', {headers});
} 

addMultipleReturns(obj: ReturnDetail[]): Observable<any> {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/addMultipleReturns', obj,{headers});
    }




addInvoice(obj: InvoiceDetails) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addInvoice', obj,{headers});
} updateInvoice(obj: InvoiceDetails) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateInvoice', obj,{headers});
}getInvoice(invoice_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getInvoice/' + invoice_id,{headers});
}deleteInvoice(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteInvoice', obj,{headers});
} 
getAllInvoice(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getInvoiceByPage?page='+page+'&limit=5', {headers});
} 
getAllInvoiceList() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllInvoice', {headers});
} 
addMultipleInvoice(obj: InvoiceDetails[]): Observable<any> {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/addMultipleInvoice', obj,{headers});
  }
addStock(obj: StockDetails) {
    let headers = this.getMyOptions();
    //console.log("Inside addCampaignactive");
    return this._http.post(this.SERVER_URL + '/addStock', obj,{headers});
} updateStock(obj: StockDetails) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateStock', obj,{headers});
}getStock(stock_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getStock/' + stock_id,{headers});
}deleteStock(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteStock', obj,{headers});
} 
getAllStock() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllStock',{headers})
} 

getFreeTrialDays(){
    return this._http.get(this.SERVER_URL + '/getFreeTrialDays')
}
updateFreeTrialDays(obj){
     let headers = this.getMyOptions();
    return this._http.put(this.SERVER_URL + '/UpdateFreeTrialDays/'+obj._id,obj,{headers})

}




/////////roles
private currentUserDetail: UserDetail;

private token: String;
  
    getToken(){
        return this.token;
    }
    setToken(token){
        this.token = token;
    }
      
    getCurrentUserDetail() {
        return this.currentUserDetail;
    }
    
    setCurrentUserDetail(userDetail) {
        this.currentUserDetail = userDetail;
    }
    //Latest Code for global Search Sales keyword
    getAllGlobalSearchSalesByKeyword(id){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchSalesByKeyword')
        return this._http.get(this.SERVER_URL + '/globalSearchSalesByKeyword/'+id,{headers});
    }

    getAllGlobalSearchByKeywordAndSection(id,type){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchByKeywordAndSection')
        return this._http.get(this.SERVER_URL + '/globalSearchByKeywordAndSection/'+id+'/'+type,{headers});
    }
     //Latest Code for global Sales Search by Date
     getAllGlobalSearchSalesByDate(from,to,page){
        //  console.log(from,to,page)
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchSalesByDate')
        return this._http.get(this.SERVER_URL + '/globalSearchSalesByDate/'+from+'/'+to+'/'+page,{headers});
    }
    
    //Latest Code for global Search Marketing keyword
    getAllGlobalSearchServiceByKeyword(id){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchServiceByKeyword')
        return this._http.get(this.SERVER_URL + '/globalSearchServiceByKeyword/'+id,{headers});
    }
    //Latest Code for Marketing Search by Date
    getAllGlobalSearchServiceByDate(from,to,page){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchServiceByDate')
        return this._http.get(this.SERVER_URL + '/globalSearchServiceByDate/'+from+'/'+to+'/'+page,{headers});
    }

    //Latest Code for global Search Inventory keyword
    getAllGlobalSearchInventoryByKeyword(id){
        let headers = this.getMyOptions();
         return this._http.get(this.SERVER_URL + '/globalSearchInventoryByKeyword/'+id,{headers});
    }
    getAllGlobalSearchHrmsByKeyword(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/globalSearchHrmsByKeyword/'+id,{headers});
    }
    //Latest Code for Inventory Search by Date
    getAllGlobalSearchInventoryByDate(from,to,page){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/globalSearchInventoryByDate/'+from+'/'+to+'/'+page,{headers});
    }



    
     //Latest Code for Marketing Search by Date
     getAllGlobalSearchMarketingByDate(from,to,page){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchMarketingByDate')
        return this._http.get(this.SERVER_URL + '/globalSearchMarketingByDate/'+from+'/'+to+'/'+page,{headers});
    }
     //Latest Code for global Search Marketing keyword
     getAllGlobalSearchMarketingByKeyword(id){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/globalSearchMarketingByKeyword')
        return this._http.get(this.SERVER_URL + '/globalSearchMarketingByKeyword/'+id,{headers});
    }
  

    //Retrieve Data According to Page Number
    getAllScheduleVisitsByPage(page){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/getScheduledVisitsByPage')
        return this._http.get(this.SERVER_URL + '/getScheduledVisitsByPage/'+page,{headers});
    }



    getAllCustomerByPage(page){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/getcustomerByPage')
        return this._http.get(this.SERVER_URL + '/getcustomerByPage/'+page,{headers});
    }

    getAllLeadsByPage(page){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/getleadsByPage')
        return this._http.get(this.SERVER_URL + '/getleadsByPage/'+page,{headers});
    }
    
getAlladdVisitsByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getaddVisitsByPage')
    return this._http.get(this.SERVER_URL + '/getaddVisitsByPage/'+page,{headers});
}


getAllDealsByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getDealsByPage')
    return this._http.get(this.SERVER_URL + '/getDealsByPage/'+page,{headers});
}


getAllProductsByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getProductsByPage')
    return this._http.get(this.SERVER_URL + '/getProductsByPage/'+page,{headers});
}

getAllQuotesByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getQuotesByPage')
    return this._http.get(this.SERVER_URL + '/getQuotesByPage/'+page,{headers});
}




getAllFaqByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getFaqByPage')
    return this._http.get(this.SERVER_URL + '/getFaqByPage/'+page,{headers});
}

getAllServiceTicketingByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getServiceTicketingByPage')
    return this._http.get(this.SERVER_URL + '/getServiceTicketingByPage/'+page,{headers});
}



getAllSourceByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getSourceByPage')
    return this._http.get(this.SERVER_URL + '/getSourceByPage/'+page,{headers});
}



getAllDesignationByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getDesignationByPage')
    return this._http.get(this.SERVER_URL + '/getDesignationByPage/'+page,{headers});
}

getAllDepartmentByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getDepartmentByPage')
    return this._http.get(this.SERVER_URL + '/getDepartmentByPage/'+page,{headers});
}

getAllExpensesByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getExpensesByPage')
    return this._http.get(this.SERVER_URL + '/getExpensesByPage/'+page,{headers});
}


getAllCategoryByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getCategoryByPage')
    return this._http.get(this.SERVER_URL + '/getCategoryByPage/'+page,{headers});
}



	getAllCurrencyByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getCurrencyByPage')
    return this._http.get(this.SERVER_URL + '/getCurrencyByPage/'+page,{headers});
}


	getAllExpenseItemByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getExpenseItemByPage')
    return this._http.get(this.SERVER_URL + '/getExpenseItemByPage/'+page,{headers});
}



	getAllSuppliernameByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getSuppliernameByPage')
    return this._http.get(this.SERVER_URL + '/getSuppliernameByPage/'+page,{headers});
}



	getAllLeadsourceByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getLeadsourceByPage')
    return this._http.get(this.SERVER_URL + '/getLeadsourceByPage/'+page,{headers});
}


getAllpipelineByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getPipelineByPage')
    return this._http.get(this.SERVER_URL + '/getPipelineByPage/'+page,{headers});
}


getAllSalesstageByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getSalesstageByPage')
    return this._http.get(this.SERVER_URL + '/getSalesstageByPage/'+page,{headers});
}



getAllContactsByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getContactsByPage')
    return this._http.get(this.SERVER_URL + '/getContactsByPage/'+page,{headers});
}


getAllCampaignByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getCampaignByPage')
    return this._http.get(this.SERVER_URL + '/getCampaignByPage/'+page,{headers});
}


getAllActivityByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getActivityByPage')
    return this._http.get(this.SERVER_URL + '/getActivityByPage/'+page,{headers});
}


getAllCampaigntypeByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getCampaigntypeByPage')
    return this._http.get(this.SERVER_URL + '/getCampaigntypeByPage/'+page,{headers});
}

getAllCampaigntypeList(){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getAllCampaigntype')
    return this._http.get(this.SERVER_URL + '/getAllCampaigntype',{headers});
}



getAllCampaignactiveByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getCampaignctiveByPage')
    return this._http.get(this.SERVER_URL + '/getCampaignctiveByPage/'+page,{headers});
}


getAllPurchaseByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getPurchaseByPage')
    return this._http.get(this.SERVER_URL + '/getPurchaseByPage/'+page,{headers});
}

getAllReturnsByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getReturnsByPage')
    return this._http.get(this.SERVER_URL + '/getReturnsByPage/'+page,{headers});
}



getAllInvoiceByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getInvoiceByPage')
    return this._http.get(this.SERVER_URL + '/getInvoiceByPage/'+page,{headers});
}

getAllWarehouseByPage(page){
    let headers = this.getMyOptions();
    // console.log(this.SERVER_URL + '/getWarehouseByPage')
    return this._http.get(this.SERVER_URL + '/getWarehouseByPage/'+page,{headers});
}


    createNewDB(obj){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/createNewDB')
        return this._http.post(this.SERVER_URL + '/createNewDB/', obj,{headers});
    }

    switchDB(name){
        const headers = new HttpHeaders({'Content-Type': 'application/json' });
        // console.log(this.SERVER_URL + `/switchDB/${name}`)
        return this._http.get(this.SERVER_URL + '/switchDB/'+name,{headers});
    }
    switchDBToOrg(email){
        // console.log(this.SERVER_URL + '/switchDBOrg')
        return this._http.get(this.SERVER_URL + '/switchDBOrg/'+email,);
    }

    switchDBUsers(email,baseEmail){
        // console.log(this.SERVER_URL + '/switchDB')
        return this._http.get(this.SERVER_URL + `/switchDBUsers/${email}/${baseEmail}`);  
    }

    checkStock(id,value,type){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/productInStock')
        return this._http.get(this.SERVER_URL + `/productInStock/${id}/${value}/${type}`,{headers});
    }

    SupplierStockCheck(id,value,type){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/addPurchases')
        return this._http.get(this.SERVER_URL + `/addPurchases/${id}/${value}/${type}`,{headers});
    }

    fetchInvoices(id){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/fetchInvoices')
        return this._http.get(this.SERVER_URL + `/fetchInvoices/${id}/`,{headers});
    }

    fetchPurchases(id){
        let headers = this.getMyOptions();
        // console.log(this.SERVER_URL + '/fetchPurchases')
        return this._http.get(this.SERVER_URL + `/fetchPurchases/${id}/`,{headers});
    }





//ogoul ticketing
    addOgoulTicketing(obj: OgoulTicketDetail) {
        let headers = this.getMyOptions();
       // console.log("Inside addTicketing");
        return this._http.post(this.SERVER_URL + '/addOgoulTicketing', obj,{headers});
    } updateOgoulTicketing(obj: OgoulTicketDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateOgoulTicketing', obj,{headers});
    }getOgoulTicketing(ogoul_ticket_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getOgoulTicketing/' + ogoul_ticket_id,{headers});
    }deleteOgoulTicketing(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteOgoulTicketing', obj,{headers});
    } 
    getAllOgoulTicketing() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllOgoulTicketing',{headers})
    }
    //Employee START   
    getAllGlobalSearchHrmsByDate(from,to,page){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/globalSearchHrmsByDate/'+from+'/'+to+'/'+page,{headers});
    }
    getAllEmployees() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllEmployees',{headers})
    }
    addEmployees(obj:EmployeeDetail) {
        let headers = this.getMyOptions();
       // console.log("Inside addTicketing");
        return this._http.post(this.SERVER_URL + '/addEmployee', obj,{headers});
    }
    updateEmployee(obj: EmployeeDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateEmployee', obj,{headers});
    }
    deleteEmployee(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteEmployees', obj,{headers});
    }
    getEmployeeByID(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getEmployeeByID/' + id,{headers});
    }
    getAllEmployeesbyPage(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getEmployeeByPage?page='+page+'&limit=5', {headers})
    }





       
////// dynamic pages 
addDesignation(obj: DesignationDetail) {
    let headers = this.getMyOptions();
    //console.log("Inside addSource");
    return this._http.post(this.SERVER_URL + '/addDesignation', obj,{headers});
} updateDesignation(obj: DesignationDetail) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updateDesignation', obj,{headers});
}getDesignation(designation_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDesignation/' + designation_id,{headers});
}deleteDesignation(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deleteDesignation', obj,{headers});
} 
getAllDesignation(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getDesignationByPage?page='+page+'&limit=5', {headers})
}
getAllDesignations() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllDesignation', {headers})
}
    //Employee END
    //Holidays START
    getAllHolidays() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllHolidays',{headers})
    }
    addHoliday(obj:HolidayDetail) {
        let headers = this.getMyOptions();
       // console.log("Inside addTicketing");
        return this._http.post(this.SERVER_URL + '/addHoliday', obj,{headers});
    }
    getHolidayByID(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getHolidayByID/' + id,{headers});
    }
    updateHoliday(obj: HolidayDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateHoliday', obj,{headers});
    }
    deleteHoliday(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteHoliday', obj,{headers});
    }
    getAllHolidayByPage(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getHolidayByPage?page='+page+'&limit=5', {headers})
    }
    //Holidays END
     //Leave START
    getAllLeaves() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllLeaves',{headers})
    }
    addLeave(obj:LeaveDetail) {
        let headers = this.getMyOptions();
       // console.log("Inside addTicketing");
        return this._http.post(this.SERVER_URL + '/addLeave', obj,{headers});
    }
    getLeaveByID(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getLeaveByID/' + id,{headers});
    }
    getLeaveByEmailID(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getLeaveByEmailID/' + id,{headers});
    }
    updateLeave(obj: LeaveDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateLeave', obj,{headers});
    }
    deleteLeave(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteLeave', obj,{headers});
    }
    getAllLeave(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getLeaveByPage?page='+page+'&limit=5', {headers})
    }
    //Leave END
    //Leave START
    getAllTrainings() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllTrainings',{headers})
    }
    addTraining(obj:TrainingDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addTraining', obj,{headers});
    }
    getTrainingByID(id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTrainingByID/' + id,{headers});
    }
    updateTraining(obj: TrainingDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateTraining', obj,{headers});
    }
    deleteTraining(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteTraining', obj,{headers});
    }
    getAllTrainingByPage(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTrainingByPage?page='+page+'&limit=5', {headers})
    }
    //Leave END
    //Travel START
        addTravel(obj: TravelDetail) {  
            let headers = this.getMyOptions();
            return this._http.post(this.SERVER_URL + '/addTravel', obj,{headers});
        } updateTravel(obj: TravelDetail) {
            let headers = this.getMyOptions();
            return this._http.post(this.SERVER_URL + '/updateTravel', obj,{headers});
        }getTravel(travel_id){
            let headers = this.getMyOptions();
            return this._http.get(this.SERVER_URL + '/getTravel/' + travel_id,{headers});
        }deleteTravel(obj){
            let headers = this.getMyOptions();
            return this._http.post(this.SERVER_URL + '/deleteTravel', obj,{headers});
        } 
        getAllTravel(page) {
            let headers = this.getMyOptions();
            return this._http.get(this.SERVER_URL + '/getTravelByPage?page='+page+'&limit=5', {headers})
        }
        getAllTravels() {
            let headers = this.getMyOptions();
            return this._http.get(this.SERVER_URL + '/getAllTravel', {headers})
        }
    //Travel END
    //Candidate START
    addCandidate(obj: CandidateDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addCandidate', obj,{headers});
    } updateCandidate(obj: CandidateDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateCandidate', obj,{headers});
    }getCandidate(candidate_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getCandidate/' + candidate_id,{headers});
    }deleteCandidate(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteCandidate', obj,{headers});
    } 
    getAllCandidate(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getCandidateByPage?page='+page+'&limit=5', {headers})
    }
    getAllCandidates() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllCandidate', {headers})
    }
    //Candidate END
    //Project START
    addProject(obj: ProjectDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addProject', obj,{headers});
    } updateProject(obj: ProjectDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateProject', obj,{headers});
    }getProject(candidate_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getProject/' + candidate_id,{headers});
    }deleteProject(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteProject', obj,{headers});
    } 
    getAllProject(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getProjectByPage?page='+page+'&limit=5', {headers})
    }
    getAllProjects() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllProjects', {headers})
    }
    //Project END

     //Attendace START
     addAttendace(obj: AttendanceDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addAttendance', obj,{headers});
    } updateAttendace(obj: AttendanceDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateAttendance', obj,{headers});
    }getAttendace(candidate_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAttendance/' + candidate_id,{headers});
    }deleteAttendace(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteAttendance', obj,{headers});
    } 
    getAllAttendace(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAttendaceByPage?page='+page+'&limit=5', {headers})
    }
    getAllAttendacesList() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllAttendances', {headers})
    }
    //Attendace END
     //Payroll START
     addPayroll(obj: PayRollDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addPayroll', obj,{headers});
    } updatePayroll(obj: PayRollDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updatePayroll', obj,{headers});
    }
    getPayroll(payroll_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getPayroll/' + payroll_id,{headers});
    }
    getPayrollByEmployeeID(employee_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getPayrollByEmployeeID/' + employee_id,{headers});
    }

    sendMailToEmployee(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/sendMailToEmployee/',(obj) ,{headers});

    }
    deletePayroll(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deletePayroll', obj,{headers});
    } 
    getAllPayroll(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getPayrollsByPage?page='+page+'&limit=5', {headers})
    }
    getAllPayrolls() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllPayrolls', {headers})
    }
    //Payroll END
     //Task Managemmet. START
     addTask(obj: TaskDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addTask', obj,{headers});
    } updateTask(obj: TaskDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateTask', obj,{headers});
    }getTask(payroll_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTask/' + payroll_id,{headers});
    }deleteTask(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteTask', obj,{headers});
    } 
    getAllTask(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTasksByPage?page='+page+'&limit=5', {headers})
    }
    getAllTasks() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllTasks', {headers})
    }
    //Task Managemmet END
     //Leave Type START
     addLeaveType(obj: LeaveTypeDetail) {  
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addLeaveType', obj,{headers});
    } updateLeaveType(obj: LeaveTypeDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateLeaveType', obj,{headers});
    }geLeaveType(candidate_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getLeaveType/' + candidate_id,{headers});
    }deleteLeaveType(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteLeaveType', obj,{headers});
    } 
    getAllLeaveType(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAleavesByPage?page='+page+'&limit=5', {headers})
    }
    getAllLeaveTypes() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllLeaveTypes', {headers})
    }
    //Leave Type  END
    //noticetab 

    addNoticetab(obj: NoticetabDetail) {
        let headers = this.getMyOptions();
        //console.log("Inside addSource");
        return this._http.post(this.SERVER_URL + '/addNoticetab', obj,{headers});
    } updateNoticetab(obj: NoticetabDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateNoticetab', obj,{headers});
    }getNoticetab(notice_tab_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getNoticetab/' + notice_tab_id,{headers});
    }deleteNoticetab(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteNoticetab', obj,{headers});
    } 
    getAllNoticetab(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getNoticetabByPage?page='+page+'&limit=5', {headers})
    }
    getAllNoticetabs() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllNoticetab', {headers})
    }

    //employeeStatus
    addEmployeestatus(obj: EmployeestatusDetail) {
        let headers = this.getMyOptions();
        //console.log("Inside addSource");
        return this._http.post(this.SERVER_URL + '/addEmployeestatus', obj,{headers});
    } updateEmployeestatus(obj: EmployeestatusDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateEmployeestatus', obj,{headers});
    }getEmployeestatus(employee_status_id){
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getEmployeestatus/' + employee_status_id,{headers});
    }deleteEmployeestatus(obj){
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteEmployeestatus', obj,{headers});
    } 
    getAllEmployeestatus(page) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getEmployeestatusByPage?page='+page+'&limit=5', {headers})
    }
    //policy
    

  addPolicy(obj: PolicyDetails) {
    let headers = this.getMyOptions();
    //console.log("Inside addSource");
    return this._http.post(this.SERVER_URL + '/addPolicy', obj,{headers});
} updatePolicy(obj: PolicyDetails) {
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/updatePolicy', obj,{headers});
}getPolicy(policy_id){
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPolicy/' + policy_id,{headers});
}deletePolicy(obj){
    let headers = this.getMyOptions();
    return this._http.post(this.SERVER_URL + '/deletePolicy', obj,{headers});
} 
getAllPolicy(page) {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getPolicyByPage?page='+page+'&limit=5', {headers})
}
getAllPolicies() {
    let headers = this.getMyOptions();
    return this._http.get(this.SERVER_URL + '/getAllPolicy', {headers})
}
}

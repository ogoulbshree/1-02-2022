import { BaseDetail } from './Basedetail.model';



export class AddvisitsDetail extends BaseDetail {
   
    visit_id: number;
    object_id: string;
    email:string;
    phone:string;
    last_name:string;
    company_name:string;
    department:string;
    other_address:string;
    sales_email:any;
    //address: string;
    /*customer_name: string;
    email: string;
   phone: string;
   first_name: string;
   last_name: string;
   
   visit_added_by_username:string;
   visit_added_by_name: string; */
  /*   visit_added_by_email: string; */
  follow_up_date:string; 
    visits_note: string;
    lat: number;
    long: number;
    user_id:string;
}


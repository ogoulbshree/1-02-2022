   import { BaseDetail } from "./Basedetail.model";

export class LeadDetail  extends BaseDetail{
    lead_id: string;
    salutation:string
    first_name: string;
    last_name: string;
    phone:string;
    email:string;
    home_phone: string;
    account_name:string;
    title:string;
    department: string;
    Fax: string;
    DOB: string;
    source:string;
    mailing_address:string;
    other_address:string;
    mailing_city:string;
    mailing_state:string;
    mailing_Postal_code:string;
    mailing_country:string;
    description:string;
    files:string;
    global_search:{type:String};
 /*    subject:string;
   due_date:string;
   task_name:string;
   status:string;
   comments:string; */

   
}



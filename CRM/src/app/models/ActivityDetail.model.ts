import { BaseDetail } from "./Basedetail.model";

export class ActivityDetail extends BaseDetail {

    activity_id: string;
    // contact_id: string;
    // lead_id:string;
    // customer_id:string;
    end_date:string;
   phone: string;
    email: string;
    subject: string;
    due_date: string;
    task_name: string;
    status: string;
    comments: string;
    call_dec: string;
    activity_type: string;
    selectedActivityType:string;
    parent_id: string;
    record_type:string;
    object_id:string;
    campaign_id:string;

}
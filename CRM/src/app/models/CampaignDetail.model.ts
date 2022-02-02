import { BaseDetail } from "./Basedetail.model";

export class CampaignDetail extends BaseDetail {
    campaign_id:number;
    campaign_owner:string;
    campaign_name:string;
    active:string;
    files:string;
    type: string;
    status:string;
    start_date:string;
    end_date:string;
    expected_revenue_in_campaign:string;
    budgeted_cost_in_campaign:string;
    actual_cost_in_campaign:string;
    expected_response_percent:string;
    description_info:string;
    object_type:number = 1;
   
}

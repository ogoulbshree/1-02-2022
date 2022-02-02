import { BaseDetail } from "./Basedetail.model";

export class DealDetail extends BaseDetail{
deal_id:number;
deal_name:string;
object_id:number;
product_id:number;
status:string;
amount:string;
expected_close_date:string;
pipeline_name:string;
salesstage_name:string;
assigned_to:string;
lead_source_name:string;
total_cost : number;
product_name : any;
phone:string;
object_type:number = 1;
deal_close_date:string;
first_name:string;

type: string;
probobility:string;
activity_type:string;
selected:boolean;
}
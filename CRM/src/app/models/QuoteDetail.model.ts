import { BaseDetail } from "./Basedetail.model";

export class QuoteDetail extends BaseDetail {
    quote_id: string;
    slno: string;
    activity_type:string;
    mobile : string; 
    object_id: string;
    phone: string;
    quotation_date : string;
   /*  productDetails : any; */
    total_cost: number;

    product_name:any;
  date: string | number | Date;
/*   mobile: any; */
    // categoryname: string;   
    // qnty : number;
    // rate : number;
    // discount  : number;
    // total  : number;
}
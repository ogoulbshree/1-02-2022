import { BaseDetail } from "./Basedetail.model";


export class PurchaseDetail extends BaseDetail {
    purchase_id: number;
    slno: string;
    
    activity_type:string;
    mobile : string; 
    supplier_id: number;
    
    purchases_date : string;
   /*  productDetails : any; */
    total_cost: number;

    product_name:any;
    warehouse_name:string;
    supplier_phone:string;
/*   mobile: any; */
    // categoryname: string;   
    // qnty : number;
    // rate : number;
    // discount  : number;
    // total  : number;
}
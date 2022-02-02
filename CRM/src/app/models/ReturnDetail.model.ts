import { BaseDetail } from "./Basedetail.model";


export class ReturnDetail extends BaseDetail {
    purchase_id: number;
    return_id: number;
    slno: string;
    purchaseID: string;
    activity_type:string;
    mobile : string; 
    supplier_id: number;
    object_id:number;
    returns_date : string;
    supplier_phone: string;
    invoice_id:string;
    phone:string;
   /*  productDetails : any; */
    total_cost: number;
    return_type:string;
    product_name:any;
    warehouse_name:string;
 
/*   mobile: any; */
    // categoryname: string;   
    // qnty : number;
    // rate : number;
    // discount  : number;
    // total  : number;
}
import { BaseDetail } from './Basedetail.model';



export class InvoiceDetails extends BaseDetail {
   
    invoice_id: string;
    customer_name:string;
    phone:string;
    product_name:any;
     quantity:string; 
     product_category:string;
      product_discount:string; 
      product_actual_price:string
       product_total_price:string;
        date:string;
        total_cost: number;
        object_id:string;
  activity_type: string;

}

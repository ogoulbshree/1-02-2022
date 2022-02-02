import { BaseDetail } from './Basedetail.model';



export class StockDetails extends BaseDetail {
    product_name: string;
    cost: number;
    currency_name:string;
    supplier_name: string;
    category_name: string;  
   
    supplier_id:string;
   stock_id:number;
    code :string
    weight:string;
    manage_stock:string;
    stock_status:string;
    stock:string;
    files:string
}


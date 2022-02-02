import { BaseDetail } from "./Basedetail.model";

export class ProductDetail extends BaseDetail {
    product_id: number;
    product_name: string;
    cost: number;
    currency_name:string;
    supplier_name: string;
    category_name: string;  
    files:string; 
    supplier_id:string;
    selected:boolean;
    code :string
    weight:string;
    manage_stock:string;
    stock_status:string;
    stock:string;
    availability:string;
    product_returned_total: string;  
    
} 
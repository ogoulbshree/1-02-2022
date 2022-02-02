import { BaseDetail } from "./Basedetail.model";

export class SuppliernameDetail extends BaseDetail{
    supplier_id: number;
    supplier_name: string;
    supplier_email:string;
    supplier_phone: string;
    supplier_address: string;
    supplier_products_name:string;
    supplier_payment_terms:string;
    supplier_pricing:number;

}
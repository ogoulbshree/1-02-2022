import { BaseDetail } from "./Basedetail.model";


export class PayRollDetail  {
   
    payroll_id:  number;
    employee_id: string;
    basic_salary: number;
    allowance_transportation: number;
    allowance_food: number;
    allowance_accomadation: number;
    net_salary: number;
    created_time: number;
    modified_time: number;
    updated_by:string;
    created_by:string;
}


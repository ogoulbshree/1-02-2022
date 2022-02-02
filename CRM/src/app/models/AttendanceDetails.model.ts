import { BaseDetail } from "./Basedetail.model";


export class AttendanceDetail  {
   
    attendance_id:  number;
    employee_id: string;
    attendance_status: Boolean;
    leave_type: string;
    leave_reason: string;
    leave_from: string;
    leave_to: string;
    leave_days:number;
    created_time: number;
    modified_time: number;
    updated_by:string;
    created_by:string;
}


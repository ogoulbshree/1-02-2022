
import { BaseDetail } from "./Basedetail.model";

export class EscalationDetail extends BaseDetail {

    escalation_id:string;
    
    ticket_id: string;
    escalate_to_email:string;
    comments:string;
   

}
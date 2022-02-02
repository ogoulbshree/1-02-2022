import { BaseDetail } from "./Basedetail.model";

export class OgoulTicketDetail extends BaseDetail{ 
    ogoul_ticket_id: string;
   
    email: string;
  
    name: string;
    status:string;
    assigned_users :string;
    subject:string;
    description:string;
    files:string;
    escalate_to_email:string;
    comments:string;
}
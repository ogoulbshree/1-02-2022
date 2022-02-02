import { BaseDetail } from "./Basedetail.model";

export class ObjectDetail extends BaseDetail  {
    _id:string;
object_id: number;
salutation:string;
first_name :string;
last_name: string;
phone:string;
email : string;
home_phone:string;
company_name:string;
account_name:string;

title:string;
department:string;
fax:string;
dob:string;
source:string;
linked_in_url:string;
opportunity_percentage :string;
mailing_address:string;
other_address:string;
mailing_city:string;
mailing_state:string;
mailing_Postal_code:string;
mailing_country:string;
description:string;
type_of_contacts:string;
object_type:number = 1;
files:string;
                                                                                                                                                                                                                                                                                                             

global_search:{type:String,default:"first_name"}
}




const mongoose = require("mongoose");

const LeadDetailSchema = mongoose.Schema({
    lead_id: { type: String, required: true },
    salutation: { type: String},
    first_name :{ type: String},
    last_name: { type: String},
    phone: { type: String},
    email : { type: String},
    home_phone:{ type: String},
    account_name:{ type: String},
    title:{ type: String},
    department:{ type: String},
    Fax:{ type: String},
    DOB:{ type: String},
    source:{ type: String},
    mailing_address:{ type: String},
    other_address:{ type: String},
    mailing_city:{ type: String},
    mailing_state:{ type: String},
    mailing_Postal_code:{ type: String},
    mailing_country:{ type: String},
    description:{ type: String},
    files:{ type: String},
    global_search:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
  /*  subject:{type:String},
   due_date:{type:String},
   task_name:{type:String},
   status:{type:String},
   comments:{type:String} */




});
module.exports = mongoose.model('LeadDetail', LeadDetailSchema, 'lead_details');

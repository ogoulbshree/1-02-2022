const mongoose = require("mongoose");

const ServiceticketingSchema = mongoose.Schema({
    ticket_id: { type: String, required: true },
    
    email: { type: String},
    assigned_users: {type: String},
    status:{type:String},
    name: { type: String},
    subject: { type: String},
    escalate_to_email:{ type: String},
    comments:{ type: String},
    description: { type: String},
    created_by:{type:String},
    files:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('Serviceticketing', ServiceticketingSchema, 'service_ticket_details');

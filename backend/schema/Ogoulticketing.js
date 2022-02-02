const mongoose = require("mongoose");

const OgoulTicketDetailSchema = mongoose.Schema({
    ogoul_ticket_id: { type: String, required: true },
    
    email: { type: String},
    assigned_users: {type: String},
    status:{type:String},
    name: { type: String},
    subject: { type: String},
    description: { type: String},
    created_by:{type:String},
    files:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    escalate_to_email:{type:String},
    comments:{type:String},
  
});
module.exports = mongoose.model('OgoulTicketDetail', OgoulTicketDetailSchema, 'ogoul_ticket_details');

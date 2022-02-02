const mongoose = require("mongoose");

const EscalationSchema = mongoose.Schema({
    ticket_id: { type: String, required: true },
    escalation_id:{type: String, required: true},
    escalate_to_email:{type:String},
    comments:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
   
  
});
module.exports = mongoose.model('EscalationDetail', EscalationSchema, 'escalation_details');

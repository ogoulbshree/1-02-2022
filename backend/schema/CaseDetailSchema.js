const mongoose = require("mongoose");

const CaseDetailSchema = mongoose.Schema({
    case_id: { type: String, required: true },
    case_name:{type:String},
    priority:{type:String},
    description:{type:String},
    object_id:{type:String},
    Escalate_to_email:{type:String},
    comments:{type:String},
    activity_type:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
  
});
module.exports = mongoose.model('CaseDetail', CaseDetailSchema, 'case_details');

const mongoose = require("mongoose");

const ActivityDetailsSchema = mongoose.Schema({
    activity_id: { type: String, required: true },
   //  contact_id: { type: String},
   //  lead_id: { type: String},
   //  customer_id: { type: String},
      subject:{type:String},
   due_date:{type:String},
   task_name:{type:String},
   status:{type:String},
   comments:{type:String},
   call_dec:{type:String},
   activity_type:{type:String},
   selectedActivityType:{type:String},
   parent_id:{type: String },
   record_type:{type:String},
   object_id:{type:String},
   campaign_id:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
});
module.exports = mongoose.model('ActivityDetail', ActivityDetailsSchema, 'activity_details');

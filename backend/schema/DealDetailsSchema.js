const mongoose = require("mongoose");

const DealDetailsSchema = mongoose.Schema({
    deal_id: { type: Number, required: true },
    deal_name:{type:String},
    object_id:{type: Number},
    product_id:{type:Number},
   amount:{type:String},
   status:{type:String},
   expected_close_date:{type:String},
   pipeline_name:{type:String},
   salesstage_name:{type:String},
   assigned_to:{type:String},
   activity_type:{type:String},
   total_cost  : { type: Number},
   object_type:{type: Number},
   product_name :{ type : Array , "default" : [] },
   deal_close_date:{type:String},
   lead_source_name:{type:String},
   type:{type: String },
   probobility:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
  
});
module.exports = mongoose.model('DealDetail', DealDetailsSchema, 'deal_details');

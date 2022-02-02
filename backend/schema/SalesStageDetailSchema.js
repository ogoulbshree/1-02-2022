const mongoose = require("mongoose");

const SalesStageDetailSchema = mongoose.Schema({
    salesstage_id: { type: String, required: true },
   salesstage_name: { type: String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
});
module.exports = mongoose.model('SalesStageDetail', SalesStageDetailSchema, 'SalesStage_details');

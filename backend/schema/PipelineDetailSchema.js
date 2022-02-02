const mongoose = require("mongoose");

const PipelineDetailSchema = mongoose.Schema({
    pipeline_id: { type: String, required: true },
   pipeline_name: { type: String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('PipelineDetail', PipelineDetailSchema, 'pipeline_details');

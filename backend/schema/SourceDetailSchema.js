const mongoose = require("mongoose");

const SourceDetailSchema = mongoose.Schema({
    source_id: { type: String, required: true },
   source_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('SourceDetail', SourceDetailSchema, 'source_details');

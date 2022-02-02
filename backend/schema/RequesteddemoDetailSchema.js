

const mongoose = require("mongoose");

const RequesteddemoDetailSchema = mongoose.Schema({
    Requested_demo_id: { type: String, required: true },
   email:{type:String},
   phone:{type:String},
   full_name:{type:String},
  
   organization:{type:String},
   plan:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
});
module.exports = mongoose.model('RequesteddemoDetail', RequesteddemoDetailSchema, 'requesteddemo_details');

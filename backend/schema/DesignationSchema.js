const mongoose = require("mongoose");

const DesignationSchema = mongoose.Schema({
    designation_id: { type: String, required: true },
    department_name:{type:String},
    designation_name:{type:String},
    designation_weight:{type:Number},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('DesignationSchema', DesignationSchema, 'designation_detail');















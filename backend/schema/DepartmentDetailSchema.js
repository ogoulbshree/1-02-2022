const mongoose = require("mongoose");

const DepartmentDetailSchema = mongoose.Schema({
    department_id: { type: String, required: true },
   department_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('DepartmentDetail', DepartmentDetailSchema, 'department_details');

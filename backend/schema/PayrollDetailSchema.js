const mongoose = require("mongoose");

const PayrollDetailSchema = mongoose.Schema({
   payroll_id: { type: Number, required: true },
   employee_id: { type: Number},
   basic_salary: { type: Number},
   allowance_transportation: { type: Number},
   allowance_food: { type: Number},
   allowance_accomadation: { type: Number},
   net_salary: { type: Number},
   
   created_by:{type:String},
   created_time:{type:Number}, 
   updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('PayrollDetail', PayrollDetailSchema, 'payroll_details');

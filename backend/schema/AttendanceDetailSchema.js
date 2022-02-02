const mongoose = require("mongoose");

const AttendanceDetailSchema = mongoose.Schema({
   attendance_id: { type: Number, required: true },
   employee_id: { type: Number},
   leave_type: { type: String},
   leave_from: { type: String},
   leave_to: { type: String},
   leave_reason: { type: String},
   leave_days:{ type: Number},
   attendance_status:{ type: Boolean},
   created_by:{type:String},
   created_time:{type:Number}, 
   updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('AttendanceDetail', AttendanceDetailSchema, 'attendance_details');

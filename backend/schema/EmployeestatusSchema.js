const mongoose = require("mongoose");

const EmployeestatusSchema = mongoose.Schema({
    employee_status_id: { type: Number, required: true },
    
    employee_status:{type:String},
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },

});
module.exports = mongoose.model('EmployeestatusDetail', EmployeestatusSchema, 'employeestatus_details');

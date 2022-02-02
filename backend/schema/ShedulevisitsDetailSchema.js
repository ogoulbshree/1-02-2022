const mongoose = require("mongoose");

const ShedulevisitsDetailSchema = mongoose.Schema({
    schedule_visit_id: { type: String},
    object_id:{type:String},
    first_name: {type:String},
    phone: {type:String},
    email:{type:String},
    other_address: {type:String},
    user_id:{type:String},
    sales_email:{type:String},
    schedule_visit_added_by_email: {type: String},
    date: {type: String},
    time: {type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
});
module.exports = mongoose.model('ShedulevisitsDetail', ShedulevisitsDetailSchema, 'schedule_visits');

const mongoose = require("mongoose");

const AddvisitsDetailSchema = mongoose.Schema({
    visit_id: { type: String },
    // customer_id:{type:String},
    // customer_name: { type: String},
    // email: { type: String},
    // phone: { type: String},
    // first_name: { type: String},
    // last_name: { type: String},
    //address: { type: String},
    // visit_added_by_username: {type: String},
    // visit_added_by_name: {type: String},
    /* visit_added_by_email: {type: String}, */
    follow_up_date:{type:String},
    visits_note: {type: String},
    lat:{type:Number},
    long:{type:Number},
    sales_email:{type:String},
    object_id: {type: String},
    user_id: { type: String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    mailSent:{type:Boolean,default:false},

    

});
module.exports = mongoose.model('AddvisitsDetail', AddvisitsDetailSchema, 'addvisits_visits');

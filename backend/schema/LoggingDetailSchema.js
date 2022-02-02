const mongoose = require("mongoose");

const LoggingDetailsSchema = mongoose.Schema({
    logged_in_email: { type: String},
    action_taken : {type: String},
    action_time: { type: String},

    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  

});
module.exports = mongoose.model('LoggingDetail', LoggingDetailsSchema, 'logging_details');

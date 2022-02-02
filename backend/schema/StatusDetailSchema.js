const mongoose = require("mongoose");

const StatusDetailSchema = mongoose.Schema({
    status_id: { type: String, required: true },
   status: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('StatusDetail', StatusDetailSchema, 'status_details');

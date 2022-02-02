const mongoose = require("mongoose");

const ActiveDetailSchema = mongoose.Schema({
    active_id: { type: String, required: true },
    active: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('ActiveDetails', ActiveDetailSchema, 'active_details');



const mongoose = require("mongoose");

const PlansDetailSchema = mongoose.Schema({
    plan_id: { type: String, required: true },
   plan: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('PlansDetail', PlansDetailSchema, 'plans_details');

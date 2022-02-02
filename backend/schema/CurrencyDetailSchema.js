

const mongoose = require("mongoose");

const CurrencyDetailSchema = mongoose.Schema({
    currency_id: { type: String, required: true },
   currency_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('CurrencyDetail', CurrencyDetailSchema, 'currency_details');

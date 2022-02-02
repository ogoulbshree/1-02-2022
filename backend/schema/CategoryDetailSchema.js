const mongoose = require("mongoose");

const CategoryDetailSchema = mongoose.Schema({
    category_id: { type: String, required: true },
   category_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('CategoryDetail', CategoryDetailSchema, 'category_details');

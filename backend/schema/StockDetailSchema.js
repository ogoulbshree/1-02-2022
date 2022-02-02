const mongoose = require("mongoose");

const StockDetailSchema = mongoose.Schema({
    stock_id: { type: Number, required: true },
    code: { type: String},
    weight:{type:String},
    manage_stock: { type: String},
    stock_status: {type: String},
    stock:{type: String},
    product_name: { type: String},
    manage_stock:{type:String},
    supplier_id:{type:String},
    cost: { type: Number},
    currency_name:{type:String},
    supplier_name: { type: String},
    category_name: {type: String},
    files:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('StockDetails', StockDetailSchema, 'stock_detail');


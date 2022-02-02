const mongoose = require("mongoose");

const ProductDetailSchema = mongoose.Schema({
    product_id: { type: Number, required: true },
    product_name: { type: String},
    code :{type:String},
    weight:{type:String},
    manage_stock:{type:String},
    stock_status:{type:String},
    stock:{type:String},
    supplier_id:{type:String},
    product_returned_count:{type:Number,default:0},
    cost: { type: Number},
    currency_name:{type:String},
    supplier_name: { type: String},
    category_name: {type: String},
    files:{type:String},
    availability:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    global_search:{type:String,default:"product"},
    product_returned_total:{type:Number,default:0},
  
});
module.exports = mongoose.model('ProductDetails', ProductDetailSchema, 'product_details');

const mongoose = require("mongoose");

const SuppliernameDetailSchema = mongoose.Schema({
    supplier_id: { type: Number, required: true },
    supplier_name: { type: String},
    supplier_email:{type:String},
    supplier_phone: { type: String},
    supplier_address: {type: String},
    supplier_products_name:{type: String},
    supplier_payment_terms:{type: String},
    supplier_pricing:{type: Number},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('SuppliernameDetail', SuppliernameDetailSchema, 'suppliername_detail');

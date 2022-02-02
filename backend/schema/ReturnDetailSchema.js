const mongoose = require("mongoose");

const ReturnDetailSchema = mongoose.Schema({
    purchase_id: { type: Number },
    return_id:{type:Number},
    slno: { type: String},
    supplier_id:{type: String},
    activity_type:{type:String},
   /*  mobile: { type: String}, */
   returns_date : { type: String},
  /*   productDetails: { type : Array , "default" : [] }, */
    total_cost  : { type: Number},
    object_id:{type: String},
    product_name :{ type : Array , "default" : [] },
    warehouse_name:{type:String},
    invoice_id:{type: Number},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('ReturnDetail', ReturnDetailSchema, 'return_detail');

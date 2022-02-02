const mongoose = require("mongoose");

const PurchaseDetailSchema = mongoose.Schema({
    purchase_id: { type: Number },
    slno: { type: String},
    supplier_id:{type: String},
    activity_type:{type:String},
   /*  mobile: { type: String}, */
   purchases_date : { type: String},
  /*   productDetails: { type : Array , "default" : [] }, */
    total_cost  : { type: Number},
  
    product_name :{ type : Array , "default" : [] },
    warehouse_name:{type:String},

    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('PurchaseDetail', PurchaseDetailSchema, 'purchase_detail');

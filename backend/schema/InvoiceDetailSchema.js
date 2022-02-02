




    const mongoose = require("mongoose");

const InvoiceDetailSchema = mongoose.Schema({
    invoice_id: { type: Number },
    customer_name: { type: String},
   
    product_name :{ type : Array , "default" : [] },

    quantity:{type:String},
   /*  mobile: { type: String}, */
   product_category : { type: String},
   total_cost:{ type: Number },
        object_id:{ type: Number },
  /*   productDetails: { type : Array , "default" : [] }, */
  product_discount:{type:String},
  product_actual_price:{type:String},
  product_total_price:{type:String},
  date:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('InvoiceDetail', InvoiceDetailSchema, 'invoice_detail');

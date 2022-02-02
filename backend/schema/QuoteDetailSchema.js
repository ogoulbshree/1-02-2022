const mongoose = require("mongoose");

const QuoteDetailSchema = mongoose.Schema({
    quote_id: { type: String, required: true },
    slno: { type: String},
    object_id:{type: String},
    activity_type:{type:String},
   /*  mobile: { type: String}, */
    quotation_date : { type: String},
  /*   productDetails: { type : Array , "default" : [] }, */
    total_cost  : { type: Number},
    product_name :{ type : Array , "default" : [] },

    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('QuoteDetails', QuoteDetailSchema, 'quote_details');

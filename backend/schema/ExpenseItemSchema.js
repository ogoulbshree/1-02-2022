const mongoose = require("mongoose");

const ExpenseItemSchema = mongoose.Schema({
    item_id: { type: String},
    expense_item: { type: String},
    email:{type:String},
    user_id:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    
});
module.exports = mongoose.model('ExpenseitemDetails', ExpenseItemSchema, 'expenseitem_details');

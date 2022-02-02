const mongoose = require("mongoose");

const ExpenseDetailSchema = mongoose.Schema({
    expense_id: { type: String },
    date: { type: String },
    expense_item: { type: String },
    amount: { type: String },
    email:{type:String},
    user_id:{type:String},
    files:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 


});
module.exports = mongoose.model('ExpenseDetails', ExpenseDetailSchema, 'expense_details');

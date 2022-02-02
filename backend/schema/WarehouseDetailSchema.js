const mongoose = require("mongoose");

const WarehouseDetailSchema = mongoose.Schema({
    warehouse_id: { type: String, required: true },
   warehouse_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('WarehouseDetail', WarehouseDetailSchema, 'Warehouse_details');

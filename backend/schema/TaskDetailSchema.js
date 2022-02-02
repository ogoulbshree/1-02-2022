const mongoose = require("mongoose");

const TaskDetailSchema = mongoose.Schema({
   task_id: { type: String, required: true },
   employee_id:{type:String},
   task_follow_up:{ type : String },
   task_name:{type:String},
   task_record_type:{type:String},
   task_status:{type:String},
   task_subject:{type:String},
   task_due_date:{type:String},
   task_comments:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
   updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('TaskDetail', TaskDetailSchema, 'task_details');

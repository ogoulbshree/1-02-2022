const mongoose = require("mongoose");

const TrainingDetailSchema = mongoose.Schema({
    training_id: { type: Number, required: true },
    training_type: { type: String },
    trainer_name: { type: String },
    trained_employee_name: { type: String },
    training_cost: { type: String },
    training_from: { type: String },
    training_to: { type: String },
    training_description: { type: String },
    training_status: { type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },

});
module.exports = mongoose.model('TrainingDetail', TrainingDetailSchema, 'training_details');

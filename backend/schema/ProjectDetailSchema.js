const mongoose = require("mongoose");

const ProjectDetailSchema = mongoose.Schema({
    project_id: { type: String, required: true },
    project_name: { type: String },
    project_team: { type : Array , "default" : [] },
    project_description: { type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },
    global_search:{type: String}


});
module.exports = mongoose.model('ProjectDetail', ProjectDetailSchema, 'project_details');

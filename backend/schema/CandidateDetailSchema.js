const mongoose = require("mongoose");

const CandidateDetailSchema = mongoose.Schema({
    candidate_id: { type: String, required: true },
    candidate_name: { type: String },
    candidate_email: { type: String },
    candidate_phone: { type: Number },
    candidate_resume: { type: String },
    candidate_status: { type: String },
    review_comments: { type: String },
    hiring_manager_comments: { type: String },
    request_feedback_comments: { type: String },
    interview_comments: { type: String },
    offer_accepted_comments: { type: String },
    rejected_comments: { type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },


});
module.exports = mongoose.model('CandidateDetail', CandidateDetailSchema, 'candidate_details');

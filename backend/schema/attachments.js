const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    lastmodyfied: String,
    size: String,
    type: String,
    file: String,
  /*   ObjectDetail: { type: mongoose.Schema.Types.ObjectId, ref: "ObjectDetail" } */
}, { timestamps: true }, )
module.exports = mongoose.model('attacment', schema)
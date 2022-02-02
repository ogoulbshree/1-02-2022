
	const mongoose = require('mongoose')

    const schema = new mongoose.Schema({
        title: String,
        start: String,
        end: String,
        color: String,
        type: String,
        description: String,
        email:String,
       /*  lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" } */
    }, { timestamps: true }, )
    module.exports = mongoose.model('calendar', schema)
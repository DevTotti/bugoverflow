const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stackSchema = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    user: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const StackModel = mongoose.model("question", stackSchema);

module.exports = StackModel;
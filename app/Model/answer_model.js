const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    que_id:  {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        required: true
    }
}, {timestamps: true});

const AnswerModel = mongoose.model("answer", answerSchema);

module.exports = AnswerModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ans_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


module.exports = mongoose.model("quecomment", commentSchema);
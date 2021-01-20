const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    que_id: {
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
    }
}, {timestamps: true});


module.exports = mongoose.model("quecomment", commentSchema);
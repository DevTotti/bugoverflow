const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
}, {timestamps: true});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
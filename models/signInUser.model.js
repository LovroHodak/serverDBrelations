const { Schema, model } = require('mongoose');

const signInUserSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
)

module.exports = model('signInUser', signInUserSchema)
const mongoose = require('mongoose')

let postSchema = new mongoose.Schema({
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

let postModel = mongoose.model('post', postSchema)
module.exports = postModel
const mongoose = require('mongoose')

let bbSchema = new mongoose.Schema({
    name: String,
    img: String,
    nickname: String
})

let bbModel = mongoose.model('character', bbSchema)
module.exports = bbModel

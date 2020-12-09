const mongoose = require('mongoose')
require('../config/db.config')
let bbModel = require('../models/bb.model')

let axios = require('axios')
axios.get('https://breakingbadapi.com/api/characters')
    .then((response) => {
        //console.log(response.data)
        bbModel.insertMany(response.data)
            .then(() => {
                console.log('bbChar inserted!')
                mongoose.connection.close()
            })
            .catch((err) => {
                console.log('BB insertion error: ',err)
            })
    })
    .catch((err) => {
        console.log('BB error: ',err)
    })


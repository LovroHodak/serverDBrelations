require('./config/db.config')


let axios = require('axios')
axios.get('https://breakingbadapi.com/api/characters')
    .then((response) => {
        console.log(response.data)
    })
    .catch((err) => {
        console.log('BB error: ',err)
    })


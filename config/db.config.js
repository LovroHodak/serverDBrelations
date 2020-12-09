const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/relations', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('DB relations connected')
    })
    .catch((err) => {
        console.log('Error: ', err)
})
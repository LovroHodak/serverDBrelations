const express = require('express')
const router = express.Router()
const bbModel = require('../models/bb.model')
let axios = require('axios')
require('dotenv').config()

router.get('/', (req, res) => {
    bbModel.find()
        .then((characters) => {
            let slicedChar = characters.slice(0,5)
            res.render('landing.hbs', {slicedChar})
        })
})


router.get('/quotes', (req, res) => {
    axios.get('https://breakingbadapi.com/api/quotes')
        .then((response) => {
            let slicedQout = response.data.slice(0,5)
            res.render('quotes.hbs', {slicedQout})
        })
        .catch((err) => {
            console.log('Quotes res.data error: ', err)
        })
})


router.get('/mars', (req, res) => {
    let API_KEY = process.env.API_KEY
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
        .then((response) => {
            let photos = response.data.photos
            res.render('mars.hbs', {photos})
        })
})




module.exports = router
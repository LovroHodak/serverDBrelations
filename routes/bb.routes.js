const express = require('express')
const router = express.Router()
const bbModel = require('../models/bb.model')
let axios = require('axios')
require('dotenv').config()
const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
const signInUserModel = require("../models/signInUser.model");
const bcrypt = require('bcryptjs')

//this below gets commented out with this: userName = userData.userName (line 125*)
//let userName = ''

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


router.get('/users', (req, res) => {
    userModel.find()
        .then((response) => {
            //console.log('Found users: ', response)
            res.render('users.hbs', {response})
        })
})

router.get('/posts', (req, res) => {
    postModel.find().populate('user')
        .then((response) => {
            //console.log('Populate result is: ', {response})
            res.render('posts.hbs', {response})
        })
})

router.get('/signUp', (req, res) => {
    res.render('auth/signUp.hbs')
});

router.post('/signUp', (req, res) => {
    //console.log('Req.body is: ', req.body)
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
        res.status(500).render('auth/signUp.hbs', {message: 'Enter all details!!'})
        return
    }
    
    let emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    if (!emailReg.test(email)) {
        res.status(500).render('auth/signUp.hbs', {message: 'Please enter valid email'})
        return
    }

    let passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    if (!passwordReg.test(password)) {
        res.status(500).render('auth/signUp.hbs', {message: 'Password must have one lowercase, one uppercase, a number, a special character and must be  8-15 digits long'})
        return
    }


    bcrypt.genSalt(10)
    .then((salt) => {
      //console.log(salt)
      bcrypt.hash(password, salt)
        .then((hashedPassword) => {
          //console.log('Pass is ', hashedPassword) 
          signInUserModel.create({
            username,
            email,
            password: hashedPassword
          })
            .then((whatt) => {
                console.log('Whatt is this: ', whatt)
                res.redirect('/')
            })
        })
    }) 
})

router.get('/signIn', (req, res) => {
    res.render('auth/signIn.hbs')
});

router.post('/signIn', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    signInUserModel.findOne({ email: email})
        .then((userData) => {
            console.log(userData)
            if(!userData){
                res.status(500).render('auth/signIn.hbs', {message: 'User does not exist!'})
                return
            }

            bcrypt.compare(password, userData.password)
                .then((result) => {
                    console.log(result)
                    if(result){
                        //userName = userData.userName
                        console.log('Req.session is: ', req.session)
                        req.session.loggedInUser = userData
                        console.log('Req.session.loggedinuser is: ', req.session.loggedInUser)
                        res.redirect('/dashboard')
                    } else {
                        res.status(500).render('auth/signIn.hbs', {message: 'Passwords do not match!'}) 
                    }
                })
                .catch(() => {
                    res.status(500).render('auth/signIn.hbs', {errorMessage: 'Something went wrong. Try again!'})
                })
        })
});

router.get('/dashboard', (req, res) => {
    console.log(req.session)
    res.render('dashboard.hbs', {name: req.session.loggedInUser.username})
})



module.exports = router
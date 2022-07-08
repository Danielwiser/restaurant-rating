const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Restaurant = require('../models/restaurant')
//@description Login/Landing page
// @route GET/
router.get('/', ensureGuest, (req,res) => {
    res.render('login',{
        layout: 'login'
    })
})

//@description Dashboard
// @route GET/dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const restaurants = await Restaurant.find({ user: req.user.id}).lean()
        res.render('Dashboard', {
            name: req.user.firstName,
            restaurants
        })
    }  catch (err){
        console.error(err)
        res.render('error/500')
    }
    
})
module.exports = router
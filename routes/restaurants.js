const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Restaurant = require('../models/restaurant')
//@description show add page
// @route GET/restaurants/add
router.get('/add', ensureAuth, (req,res) => {
    res.render('restaurants/add')
    
})

// @description Process add form
// @route
router.post('/', ensureAuth, async (req,res) => {
    try{
        req.body.user = req.user.id
        await Restaurant.create(req.body)
        res.redirect('/dashboard')
    } catch (err){
        console.error(err)
        res.render('error/500')
    }
    
})

module.exports = router
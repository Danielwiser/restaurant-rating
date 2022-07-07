const express = require('express')
const passport = require('passport')
const router = express.Router()

//@description authenticate with Google
// @route GET/auth/google
router.get('/auth/google', passport.authenticate('google', { scope:['profile']}))

//@description Google callback
// @route GET/auth/google/callback
router.get(
    '/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/'})  ,
    (req, res) => {
        res.redirect('/dashboard')
    }
)


///c creating logout user
// @descriotion  logout user
// @route /auth/logout
router.get('/auth/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err){return next(err)}
        res.redirect('/')
    })
    
})

module.exports = router
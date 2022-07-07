// this is a user model that gives us data from user 

const mongoose = require('mongoose')






// Schema 
const UserSchema = new mongoose.Schema({ 
   // this helps in getting feeds back from google when users authentitcate with google
    googleId: {
        type: String,
        // required: true
    },
    displayName: {
        type: String
        // required: true
    },
    firstName: {
        type: String
        // required: true
    },
    lastName: {
        type: String
        // required: true
    },
    image: {
        type: String
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)

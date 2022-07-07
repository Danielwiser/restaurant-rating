const mongoose = require('mongoose')
const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {
        // avoid warnings in the console  
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          // useFindAndModify: false
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err){
        // something goes wrong and we cant connect? then
        console.error(err)
        process.exit(1)
    }
} 
// This will be run in the app.js file
module.exports = connectDB
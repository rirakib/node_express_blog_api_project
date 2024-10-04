const mongoose = require("mongoose")
require('dotenv').config()
const env = process.env

const db = async () => {
    try{
        await mongoose.connect(env.DB_URL)
        console.log('mongo connected')
    }catch(err){
        console.log(err.message)
    }
}

module.exports = db
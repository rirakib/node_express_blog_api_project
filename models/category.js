const mongoose = require("mongoose")
require('dotenv').config()
const moment = require("moment-timezone");


const Schema = new mongoose.Schema({
    title: {
        type: String,
        require : true
    },
    status : {
        type : Boolean,
        default : true
    },
    createdAt: {
        type : Date,
        default: () => moment().tz(process.env.TIMEZONE).toDate()
    }
})

const Category = mongoose.model("Category",Schema)

module.exports = Category

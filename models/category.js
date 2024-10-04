const mongoose = require("mongoose")


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
        default:Date.now()
    }
})

const Category = mongoose.model("Category",Schema)

module.exports = Category

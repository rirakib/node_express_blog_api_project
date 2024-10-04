const express = require("express")
const app = express()
const adminRoute = require("./admin.js")

app.use("/admin",adminRoute)



module.exports = app
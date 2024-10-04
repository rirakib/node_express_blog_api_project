const express = require("express")
const app = express()
const adminRoute = require("./admin.js")
const authRoute = require("./auth.js")
const { isAuthenticate, isAdmin } = require("../middleware/middleware.js")

app.use("/admin",[isAuthenticate,isAdmin],adminRoute)
app.use("/auth",authRoute)




module.exports = app
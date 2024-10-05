const express = require("express")
const app = express()
const adminRoute = require("./admin.js")
const authRoute = require("./auth.js")
const { isAuthenticate, isAdmin } = require("../middleware/middleware.js")
const userRoute = require("./user.js")

app.use("/admin",[isAuthenticate,isAdmin],adminRoute)
app.use("/auth",authRoute)
app.use("/user",[isAuthenticate],userRoute)




module.exports = app
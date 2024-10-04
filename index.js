const app = require("./app.js")
const db = require("./config/db.js")
require('dotenv').config()
const env = process.env


app.listen(env.port,()=>{
    db()
    console.log(`server running http://${env.host}:${env.port}`)
})
